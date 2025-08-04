import { Request, Response } from 'express';

// Helper function - should be outside the controller
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const createChemistController = async (req: Request, res: Response) => {
    try {
        const {
            name,
            type,
            chemistChainId,
            territoryId,
            email,
            phone,
            address,
            city,
            state,
            pincode,
            latitude,
            longitude,
            description,
            profilePictureUrl,
            visitingHours
        } = req.body;

        const tenantDb = req.tenantDb;
        const organizationId = req.user?.organizationId;
        const createdById = req.user?.id;

        // Check if tenantDb exists
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        // Validation
        if (!name || !type || !territoryId || !organizationId || !createdById) {
            return res.status(400).json({
                success: false,
                message: 'Name, type, territory ID, organization ID, and creator ID are required'
            });
        }

        // Email validation if provided
        if (email && !isValidEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Check if chemist with email already exists (only if email is provided)
        if (email) {
            const existingChemist = await tenantDb.chemist.findFirst({
                where: { email }
            });

            if (existingChemist) {
                return res.status(400).json({
                    success: false,
                    message: 'Chemist with this email already exists'
                });
            }
        }

        // Check if territory exists
        const territoryExists = await tenantDb.territory.findUnique({
            where: { id: territoryId }
        });

        if (!territoryExists) {
            return res.status(404).json({
                success: false,
                message: 'Territory not found'
            });
        }

        // Check if chemist chain exists (if provided)
        if (chemistChainId) {
            const chainExists = await tenantDb.chemistChain.findUnique({
                where: { id: chemistChainId }
            });

            if (!chainExists) {
                return res.status(404).json({
                    success: false,
                    message: 'Chemist chain not found'
                });
            }
        }

        // Create the chemist
        const newChemist = await tenantDb.chemist.create({
            data: {
                organizationId,
                name,
                type,
                chemistChainId,
                territoryId,
                email,
                phone,
                address,
                city,
                state,
                pincode,
                latitude: latitude ? parseFloat(latitude) : null,
                longitude: longitude ? parseFloat(longitude) : null,
                description,
                profilePictureUrl,
                visitingHours,
                createdById,
                isActive: true
            }
        });

        console.log(`Chemist "${name}" created successfully in tenant schema`);

        // Return success response
        return res.status(201).json({
            success: true,
            message: 'Chemist created successfully',
            data: newChemist
        });

    } catch (error: any) {
        console.error('Error in Chemist Creation:', error);
        // Generic error response
        return res.status(500).json({
            success: false,
            message: 'Chemist creation failed',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const updateChemist = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const chemistId = req.params.chemistId;
        const {
            name,
            type,
            chemistChainId,
            email,
            phone,
            address,
            city,
            state,
            pincode,
            latitude,
            longitude,
            description,
            profilePictureUrl,
            visitingHours
        } = req.body;

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!chemistId) {
            return res.status(400).json({
                success: false,
                message: 'Chemist ID is required'
            });
        }

        // Check if chemist exists and is active
        const existingChemist = await tenantDb.chemist.findFirst({
            where: {
                id: chemistId,
                isActive: true
            }
        });

        if (!existingChemist) {
            return res.status(404).json({
                success: false,
                message: 'Chemist not found or is not active'
            });
        }

        // Update the chemist
        const updatedChemist = await tenantDb.chemist.update({
            where: { id: chemistId },
            data: {
                name,
                type,
                chemistChainId,
                email,
                phone,
                address,
                city,
                state,
                pincode,
                latitude: latitude ? parseFloat(latitude) : undefined,
                longitude: longitude ? parseFloat(longitude) : undefined,
                description,
                profilePictureUrl,
                visitingHours
            },
            select: {
                id: true,
                organizationId: true,
                name: true,
                type: true,
                chemistChainId: true,
                territoryId: true,
                email: true,
                phone: true,
                address: true,
                city: true,
                state: true,
                pincode: true,
                latitude: true,
                longitude: true,
                description: true,
                profilePictureUrl: true,
                visitingHours: true,
                isActive: true,
                createdAt: true,
                updatedAt: true
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Chemist details updated successfully',
            chemist: updatedChemist
        });

    } catch (error: any) {
        console.error('Error updating chemist:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating chemist details',
            error: error.message
        });
    }
};

// Soft delete chemist (set isActive to false)
export const deleteChemist = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const chemistId = req.params.chemistId;

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!chemistId) {
            return res.status(400).json({
                success: false,
                message: 'Chemist ID is required'
            });
        }

        // Check if chemist exists and is active
        const existingChemist = await tenantDb.chemist.findFirst({
            where: {
                id: chemistId,
                isActive: true
            }
        });

        if (!existingChemist) {
            return res.status(404).json({
                success: false,
                message: 'Chemist not found or is already inactive'
            });
        }

        // Perform soft delete by setting isActive to false
        const deactivatedChemist = await tenantDb.chemist.update({
            where: { id: chemistId },
            data: {
                isActive: false
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                type: true,
                isActive: true,
                updatedAt: true
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Chemist deactivated successfully',
            chemist: deactivatedChemist
        });

    } catch (error: any) {
        console.error('Error deleting chemist:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while deactivating the chemist',
            error: error.message
        });
    }
};

export const getChemistListController = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const userId = req.user?.id;
        const organizationId = req.user?.organizationId;

        // Check if tenantDb exists
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        // Validation
        if (!userId || !organizationId) {
            return res.status(400).json({
                success: false,
                message: 'User ID and organization ID are required'
            });
        }

        // Step 1: Get user's territories (active assignments only)
        const userTerritories = await tenantDb.employeeTerritory.findMany({
            where: {
                employeeId: userId,
                unassignedAt: null // Only active territory assignments
            },
            select: {
                territoryId: true,
                isPrimary: true
            }
        });

        if (userTerritories.length === 0) {
            return res.status(200).json({
                success: true,
                message: 'No territories assigned to user',
                data: []
            });
        }

        // Extract territory IDs with proper typing
        const territoryIds = userTerritories.map((ut: { territoryId: string }) => ut.territoryId);

        // Step 2: Get all chemists in user's territories
        const chemists = await tenantDb.chemist.findMany({
            where: {
                territoryId: {
                    in: territoryIds
                },
                isActive: true
            },
            select: {
                id: true,
                name: true,
                type: true,
                email: true,
                phone: true,
                address: true,
                city: true,
                state: true,
                pincode: true,
                visitingHours: true,
                chemistChain: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                territory: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },
            orderBy: {
                name: 'asc'
            }
        });

        // Format the response
        const chemistList = chemists.map((chemist: any) => ({
            chemistId: chemist.id,
            chemistName: chemist.name,
            type: chemist.type,
            email: chemist.email,
            phone: chemist.phone,
            address: formatAddress(chemist),
            visitingHours: chemist.visitingHours,
            chainName: chemist.chemistChain?.name || null,
            territoryName: chemist.territory.name
        }));

        // Add summary statistics
        const summary = {
            totalTerritories: territoryIds.length,
            totalChemists: chemistList.length
        };

        return res.status(200).json({
            success: true,
            message: 'Chemists list retrieved successfully',
            summary,
            data: chemistList
        });

    } catch (error: any) {
        console.error('Error in getChemistList:', error);

        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve chemists list',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Helper function to format address
const formatAddress = (chemist: any): string => {
    const parts = [
        chemist.address,
        chemist.city,
        chemist.state,
        chemist.pincode
    ].filter(Boolean);

    return parts.join(', ');
};

export const getChemistDetails = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const chemistId = req.params.chemistId;

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!chemistId) {
            return res.status(400).json({
                success: false,
                message: 'Chemist ID is required'
            });
        }

        // Fetch chemist details with all related information
        const chemist = await tenantDb.chemist.findFirst({
            where: {
                id: chemistId,
                isActive: true // Assuming you want only active chemists
            },
            select: {
                id: true,
                organizationId: true,
                name: true,
                type: true,
                email: true,
                phone: true,
                address: true,
                city: true,
                state: true,
                pincode: true,
                latitude: true,
                longitude: true,
                description: true,
                profilePictureUrl: true,
                visitingHours: true,
                chemistChain: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                territory: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        if (!chemist) {
            return res.status(404).json({
                success: false,
                message: 'Chemist not found or is not active'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Chemist details fetched successfully',
            chemist
        });

    } catch (error: any) {
        console.error('Error fetching chemist details:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching chemist details',
            error: error.message
        });
    }
};

// ChemistNote Controllers

// Create a new chemist note
export const createChemistNote = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const { chemistId, content } = req.body;
        const createdById = req.user?.id; // Assuming user info is attached to request

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!chemistId || !content) {
            return res.status(400).json({
                success: false,
                message: 'Chemist ID and content are required'
            });
        }

        if (!createdById) {
            return res.status(401).json({
                success: false,
                message: 'User authentication required'
            });
        }

        // Check if chemist exists
        const chemistExists = await tenantDb.chemist.findUnique({
            where: { id: chemistId }
        });

        if (!chemistExists) {
            return res.status(404).json({
                success: false,
                message: 'Chemist not found'
            });
        }

        // Check if employee (creator) exists
        const employeeExists = await tenantDb.employee.findUnique({
            where: { id: createdById }
        });

        if (!employeeExists) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        // Create the note
        const note = await tenantDb.chemistNote.create({
            data: {
                chemistId,
                createdById,
                content: content.trim()
            },
            include: {
                chemist: {
                    select: {
                        id: true,
                        name: true,
                        type: true
                    }
                },
                createdBy: {
                    select: {
                        id: true,
                        email: true,
                        role: true
                    }
                }
            }
        });

        return res.status(201).json({
            success: true,
            message: 'Chemist note created successfully',
            note
        });

    } catch (error: any) {
        console.error('Error creating chemist note:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while creating the note',
            error: error.message
        });
    }
};

// Get all notes for a specific chemist
export const getNotesForChemist = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const chemistId = req.params.chemistId;
        const { searchTerm, startDate, endDate, page = 1, limit = 10 } = req.query;

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!chemistId) {
            return res.status(400).json({
                success: false,
                message: 'Chemist ID is required'
            });
        }

        // Check if chemist exists
        const chemistExists = await tenantDb.chemist.findUnique({
            where: { id: chemistId },
            select: {
                id: true,
                name: true,
                type: true
            }
        });

        if (!chemistExists) {
            return res.status(404).json({
                success: false,
                message: 'Chemist not found'
            });
        }

        // Build where clause
        const where: any = { chemistId };

        // Search in content
        if (searchTerm) {
            where.content = {
                contains: searchTerm as string,
                mode: 'insensitive'
            };
        }

        // Date range filter
        if (startDate || endDate) {
            where.createdAt = {};
            if (startDate) where.createdAt.gte = new Date(startDate as string);
            if (endDate) where.createdAt.lte = new Date(endDate as string);
        }

        // Calculate pagination
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);

        // Get total count
        const totalCount = await tenantDb.chemistNote.count({ where });

        // Fetch notes for the chemist
        const notes = await tenantDb.chemistNote.findMany({
            where,
            skip,
            take,
            include: {
                createdBy: {
                    select: {
                        id: true,
                        email: true,
                        role: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Chemist notes fetched successfully',
            data: {
                chemist: chemistExists,
                notes,
                pagination: {
                    total: totalCount,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(totalCount / Number(limit))
                }
            }
        });

    } catch (error: any) {
        console.error('Error fetching chemist notes:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching chemist notes',
            error: error.message
        });
    }
};

// Get all notes created by a specific employee for chemists
export const getChemistNotesByEmployee = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const employeeId = req.params.employeeId;
        const { chemistId, page = 1, limit = 10 } = req.query;

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!employeeId) {
            return res.status(400).json({
                success: false,
                message: 'Employee ID is required'
            });
        }

        // Check if employee exists
        const employeeExists = await tenantDb.employee.findUnique({
            where: { id: employeeId },
            select: {
                id: true,
                email: true,
                role: true
            }
        });

        if (!employeeExists) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        // Build where clause
        const where: any = { createdById: employeeId };
        if (chemistId) where.chemistId = chemistId;

        // Calculate pagination
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);

        // Get total count
        const totalCount = await tenantDb.chemistNote.count({ where });

        // Fetch notes created by the employee
        const notes = await tenantDb.chemistNote.findMany({
            where,
            skip,
            take,
            include: {
                chemist: {
                    select: {
                        id: true,
                        name: true,
                        type: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Employee chemist notes fetched successfully',
            data: {
                employee: employeeExists,
                notes,
                pagination: {
                    total: totalCount,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(totalCount / Number(limit))
                }
            }
        });

    } catch (error: any) {
        console.error('Error fetching employee chemist notes:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching employee chemist notes',
            error: error.message
        });
    }
};

// Update a chemist note
export const updateChemistNote = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const noteId = req.params.noteId;
        const { content } = req.body;
        const userId = req.user?.id; // Current user making the update

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!noteId) {
            return res.status(400).json({
                success: false,
                message: 'Note ID is required'
            });
        }

        if (!content) {
            return res.status(400).json({
                success: false,
                message: 'Content is required'
            });
        }

        // Check if note exists
        const existingNote = await tenantDb.chemistNote.findUnique({
            where: { id: noteId }
        });

        if (!existingNote) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }

        // Check if user has permission to update (only creator can update)
        if (existingNote.createdById !== userId) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to update this note'
            });
        }

        // Update the note
        const updatedNote = await tenantDb.chemistNote.update({
            where: { id: noteId },
            data: {
                content: content.trim()
            },
            include: {
                chemist: {
                    select: {
                        id: true,
                        name: true,
                        type: true
                    }
                },
                createdBy: {
                    select: {
                        id: true,
                        email: true,
                        role: true
                    }
                }
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Note updated successfully',
            note: updatedNote
        });

    } catch (error: any) {
        console.error('Error updating note:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the note',
            error: error.message
        });
    }
};

// Delete a chemist note
export const deleteChemistNote = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const noteId = req.params.noteId;
        const userId = req.user?.id; // Current user making the request
        const userRole = req.user?.role; // Assuming role is available

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!noteId) {
            return res.status(400).json({
                success: false,
                message: 'Note ID is required'
            });
        }

        // Check if note exists
        const note = await tenantDb.chemistNote.findUnique({
            where: { id: noteId }
        });

        if (!note) {
            return res.status(404).json({
                success: false,
                message: 'Note not found'
            });
        }

        // Check permission (only creator or admin can delete)
        if (note.createdById !== userId && userRole !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to delete this note'
            });
        }

        // Delete the note
        await tenantDb.chemistNote.delete({
            where: { id: noteId }
        });

        return res.status(200).json({
            success: true,
            message: 'Note deleted successfully'
        });

    } catch (error: any) {
        console.error('Error deleting note:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the note',
            error: error.message
        });
    }
};

// ChemistInteraction Controllers

// Create a new chemist interaction
export const createChemistInteraction = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const {
            chemistId,
            interactionType,
            startTime,
            endTime,
            purpose,
            outcome,
            comments,
            rating,
            chemistTaskId
        } = req.body;
        const employeeId = req.user?.id; // Assuming user info is attached to request

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!chemistId || !interactionType || !startTime) {
            return res.status(400).json({
                success: false,
                message: 'Chemist ID, interaction type, and start time are required'
            });
        }

        if (!employeeId) {
            return res.status(401).json({
                success: false,
                message: 'User authentication required'
            });
        }

        // Validate rating if provided
        if (rating !== undefined && (rating < 1 || rating > 5)) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        // Check if chemist exists
        const chemistExists = await tenantDb.chemist.findUnique({
            where: { id: chemistId }
        });

        if (!chemistExists) {
            return res.status(404).json({
                success: false,
                message: 'Chemist not found'
            });
        }

        // Check if employee exists
        const employeeExists = await tenantDb.employee.findUnique({
            where: { id: employeeId }
        });

        if (!employeeExists) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        // Check if task exists (if provided)
        if (chemistTaskId) {
            const taskExists = await tenantDb.chemistTask.findUnique({
                where: { id: chemistTaskId }
            });

            if (!taskExists) {
                return res.status(404).json({
                    success: false,
                    message: 'Chemist task not found'
                });
            }
        }

        // Validate start and end times
        const startDateTime = new Date(startTime);
        const endDateTime = endTime ? new Date(endTime) : null;

        if (endDateTime && endDateTime <= startDateTime) {
            return res.status(400).json({
                success: false,
                message: 'End time must be after start time'
            });
        }

        // Create the interaction
        const interaction = await tenantDb.chemistInteraction.create({
            data: {
                chemistId,
                employeeId,
                interactionType,
                startTime: startDateTime,
                endTime: endDateTime,
                purpose: purpose?.trim(),
                outcome: outcome?.trim(),
                comments: comments?.trim(),
                rating,
                chemistTaskId
            },
            include: {
                chemist: {
                    select: {
                        id: true,
                        name: true,
                        type: true
                    }
                },
                employee: {
                    select: {
                        id: true,
                        email: true,
                        role: true
                    }
                },
                chemistTask: chemistTaskId ? {
                    select: {
                        id: true,
                        taskStatus: true
                    }
                } : false
            }
        });

        return res.status(201).json({
            success: true,
            message: 'Chemist interaction created successfully',
            interaction
        });

    } catch (error: any) {
        console.error('Error creating chemist interaction:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while creating the interaction',
            error: error.message
        });
    }
};

// Get all interactions for a specific chemist
export const getInteractionsForChemist = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const chemistId = req.params.chemistId;
        const {
            interactionType,
            employeeId,
            startDate,
            endDate,
            page = 1,
            limit = 10
        } = req.query;

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!chemistId) {
            return res.status(400).json({
                success: false,
                message: 'Chemist ID is required'
            });
        }

        // Check if chemist exists
        const chemistExists = await tenantDb.chemist.findUnique({
            where: { id: chemistId },
            select: {
                id: true,
                name: true,
                type: true
            }
        });

        if (!chemistExists) {
            return res.status(404).json({
                success: false,
                message: 'Chemist not found'
            });
        }

        // Build where clause
        const where: any = { chemistId };
        if (interactionType) where.interactionType = interactionType;
        if (employeeId) where.employeeId = employeeId;

        // Date range filter
        if (startDate || endDate) {
            where.startTime = {};
            if (startDate) where.startTime.gte = new Date(startDate as string);
            if (endDate) where.startTime.lte = new Date(endDate as string);
        }

        // Calculate pagination
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);

        // Get total count
        const totalCount = await tenantDb.chemistInteraction.count({ where });

        // Get interaction statistics
        const stats = await tenantDb.chemistInteraction.aggregate({
            where: { chemistId },
            _count: {
                _all: true
            },
            _avg: {
                rating: true
            }
        });

        // Get interaction type breakdown
        const interactionTypes = await tenantDb.chemistInteraction.groupBy({
            by: ['interactionType'],
            where: { chemistId },
            _count: {
                _all: true
            }
        });

        // Fetch interactions
        const interactions = await tenantDb.chemistInteraction.findMany({
            where,
            skip,
            take,
            include: {
                employee: {
                    select: {
                        id: true,
                        email: true,
                        role: true
                    }
                }
            },
            orderBy: {
                startTime: 'desc'
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Chemist interactions fetched successfully',
            data: {
                chemist: chemistExists,
                statistics: {
                    totalInteractions: stats._count._all,
                    averageRating: stats._avg.rating,
                    byType: interactionTypes
                },
                interactions,
                pagination: {
                    total: totalCount,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(totalCount / Number(limit))
                }
            }
        });

    } catch (error: any) {
        console.error('Error fetching chemist interactions:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching chemist interactions',
            error: error.message
        });
    }
};

// Get all chemist interactions by an employee
export const getChemistInteractionsByEmployee = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const employeeId = req.params.employeeId;
        const {
            chemistId,
            interactionType,
            startDate,
            endDate,
            page = 1,
            limit = 10
        } = req.query;

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!employeeId) {
            return res.status(400).json({
                success: false,
                message: 'Employee ID is required'
            });
        }

        // Check if employee exists
        const employeeExists = await tenantDb.employee.findUnique({
            where: { id: employeeId },
            select: {
                id: true,
                email: true,
                role: true
            }
        });

        if (!employeeExists) {
            return res.status(404).json({
                success: false,
                message: 'Employee not found'
            });
        }

        // Build where clause
        const where: any = { employeeId };
        if (chemistId) where.chemistId = chemistId;
        if (interactionType) where.interactionType = interactionType;

        // Date range filter
        if (startDate || endDate) {
            where.startTime = {};
            if (startDate) where.startTime.gte = new Date(startDate as string);
            if (endDate) where.startTime.lte = new Date(endDate as string);
        }

        // Calculate pagination
        const skip = (Number(page) - 1) * Number(limit);
        const take = Number(limit);

        // Get total count
        const totalCount = await tenantDb.chemistInteraction.count({ where });

        // Get today's interactions count
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayCount = await tenantDb.chemistInteraction.count({
            where: {
                employeeId,
                startTime: { gte: today }
            }
        });

        // Fetch interactions
        const interactions = await tenantDb.chemistInteraction.findMany({
            where,
            skip,
            take,
            include: {
                chemist: {
                    select: {
                        id: true,
                        name: true,
                        type: true
                    }
                }
            },
            orderBy: {
                startTime: 'desc'
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Employee chemist interactions fetched successfully',
            data: {
                employee: employeeExists,
                statistics: {
                    totalInteractions: totalCount,
                    todayInteractions: todayCount
                },
                interactions,
                pagination: {
                    total: totalCount,
                    page: Number(page),
                    limit: Number(limit),
                    totalPages: Math.ceil(totalCount / Number(limit))
                }
            }
        });

    } catch (error: any) {
        console.error('Error fetching employee chemist interactions:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching employee chemist interactions',
            error: error.message
        });
    }
};

// Update a chemist interaction
export const updateChemistInteraction = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const interactionId = req.params.interactionId;
        const {
            endTime,
            purpose,
            outcome,
            comments,
            rating
        } = req.body;
        const userId = req.user?.id; // Current user making the update

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!interactionId) {
            return res.status(400).json({
                success: false,
                message: 'Interaction ID is required'
            });
        }

        // Check if interaction exists
        const existingInteraction = await tenantDb.chemistInteraction.findUnique({
            where: { id: interactionId }
        });

        if (!existingInteraction) {
            return res.status(404).json({
                success: false,
                message: 'Interaction not found'
            });
        }

        // Check if user has permission to update (only creator can update)
        if (existingInteraction.employeeId !== userId) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to update this interaction'
            });
        }

        // Validate rating if provided
        if (rating !== undefined && (rating < 1 || rating > 5)) {
            return res.status(400).json({
                success: false,
                message: 'Rating must be between 1 and 5'
            });
        }

        // Validate end time if provided
        if (endTime) {
            const endDateTime = new Date(endTime);
            if (endDateTime <= existingInteraction.startTime) {
                return res.status(400).json({
                    success: false,
                    message: 'End time must be after start time'
                });
            }
        }

        // Update the interaction
        const updatedInteraction = await tenantDb.chemistInteraction.update({
            where: { id: interactionId },
            data: {
                endTime: endTime ? new Date(endTime) : undefined,
                purpose: purpose?.trim(),
                outcome: outcome?.trim(),
                comments: comments?.trim(),
                rating
            },
            include: {
                chemist: {
                    select: {
                        id: true,
                        name: true,
                        type: true
                    }
                },
                employee: {
                    select: {
                        id: true,
                        email: true,
                        role: true
                    }
                }
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Interaction updated successfully',
            interaction: updatedInteraction
        });

    } catch (error: any) {
        console.error('Error updating interaction:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the interaction',
            error: error.message
        });
    }
};

// Delete a chemist interaction
export const deleteChemistInteraction = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const interactionId = req.params.interactionId;
        const userId = req.user?.id; // Current user making the request
        const userRole = req.user?.role; // Assuming role is available

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!interactionId) {
            return res.status(400).json({
                success: false,
                message: 'Interaction ID is required'
            });
        }

        // Check if interaction exists
        const interaction = await tenantDb.chemistInteraction.findUnique({
            where: { id: interactionId }
        });

        if (!interaction) {
            return res.status(404).json({
                success: false,
                message: 'Interaction not found'
            });
        }

        // Check permission (only creator or admin can delete)
        if (interaction.employeeId !== userId && userRole !== 'ADMIN') {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to delete this interaction'
            });
        }

        // Delete the interaction
        await tenantDb.chemistInteraction.delete({
            where: { id: interactionId }
        });

        return res.status(200).json({
            success: true,
            message: 'Interaction deleted successfully'
        });

    } catch (error: any) {
        console.error('Error deleting interaction:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the interaction',
            error: error.message
        });
    }
};

// DoctorChemistRelation Controllers

// Create a new doctor-chemist relation
export const createDoctorChemistRelation = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const { doctorId, chemistId } = req.body;
        const createdById = req.user?.id; // Assuming user info is attached to request

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!doctorId || !chemistId) {
            return res.status(400).json({
                success: false,
                message: 'Doctor ID and Chemist ID are required'
            });
        }

        if (!createdById) {
            return res.status(401).json({
                success: false,
                message: 'User authentication required'
            });
        }

        // Check if doctor exists
        const doctorExists = await tenantDb.doctor.findUnique({
            where: { id: doctorId }
        });

        if (!doctorExists) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Check if chemist exists
        const chemistExists = await tenantDb.chemist.findUnique({
            where: { id: chemistId }
        });

        if (!chemistExists) {
            return res.status(404).json({
                success: false,
                message: 'Chemist not found'
            });
        }

        // Check if relation already exists
        const existingRelation = await tenantDb.doctorChemistRelation.findFirst({
            where: {
                doctorId,
                chemistId
            }
        });

        if (existingRelation) {
            return res.status(409).json({
                success: false,
                message: 'Relation already exists between this doctor and chemist'
            });
        }

        // Create the relation
        const relation = await tenantDb.doctorChemistRelation.create({
            data: {
                doctorId,
                chemistId,
                createdById
            },
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        specialization: true
                    }
                },
                chemist: {
                    select: {
                        id: true,
                        name: true,
                        type: true
                    }
                },
                createdBy: {
                    select: {
                        id: true,
                        email: true
                    }
                }
            }
        });

        return res.status(201).json({
            success: true,
            message: 'Doctor-chemist relation created successfully',
            relation
        });

    } catch (error: any) {
        console.error('Error creating doctor-chemist relation:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while creating the relation',
            error: error.message
        });
    }
};

// Get all chemists related to a doctor
export const getChemistsForDoctor = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const doctorId = req.params.doctorId;

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!doctorId) {
            return res.status(400).json({
                success: false,
                message: 'Doctor ID is required'
            });
        }

        // Check if doctor exists
        const doctorExists = await tenantDb.doctor.findUnique({
            where: { id: doctorId },
            select: {
                id: true,
                name: true,
                specialization: true
            }
        });

        if (!doctorExists) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Fetch all chemist relations for the doctor
        const relations = await tenantDb.doctorChemistRelation.findMany({
            where: {
                doctorId
            },
            include: {
                chemist: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                        email: true,
                        phone: true,
                        address: true,
                        city: true,
                        state: true
                    }
                },
                createdBy: {
                    select: {
                        id: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Doctor chemists fetched successfully',
            data: {
                doctor: doctorExists,
                chemists: relations
            }
        });

    } catch (error: any) {
        console.error('Error fetching doctor chemists:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching doctor chemists',
            error: error.message
        });
    }
};

// Get all doctors related to a chemist
export const getDoctorsForChemist = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const chemistId = req.params.chemistId;

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!chemistId) {
            return res.status(400).json({
                success: false,
                message: 'Chemist ID is required'
            });
        }

        // Check if chemist exists
        const chemistExists = await tenantDb.chemist.findUnique({
            where: { id: chemistId },
            select: {
                id: true,
                name: true,
                type: true
            }
        });

        if (!chemistExists) {
            return res.status(404).json({
                success: false,
                message: 'Chemist not found'
            });
        }

        // Fetch all doctor relations for the chemist
        const relations = await tenantDb.doctorChemistRelation.findMany({
            where: {
                chemistId
            },
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        specialization: true,
                        email: true,
                        phone: true,
                        qualification: true
                    }
                },
                createdBy: {
                    select: {
                        id: true,
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Chemist doctors fetched successfully',
            data: {
                chemist: chemistExists,
                doctors: relations
            }
        });

    } catch (error: any) {
        console.error('Error fetching chemist doctors:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching chemist doctors',
            error: error.message
        });
    }
};

// Delete a doctor-chemist relation
export const deleteDoctorChemistRelation = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const relationId = req.params.relationId;

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!relationId) {
            return res.status(400).json({
                success: false,
                message: 'Relation ID is required'
            });
        }

        // Check if relation exists
        const relation = await tenantDb.doctorChemistRelation.findUnique({
            where: { id: relationId }
        });

        if (!relation) {
            return res.status(404).json({
                success: false,
                message: 'Relation not found'
            });
        }

        // Delete the relation
        await tenantDb.doctorChemistRelation.delete({
            where: { id: relationId }
        });

        return res.status(200).json({
            success: true,
            message: 'Doctor-chemist relation deleted successfully'
        });

    } catch (error: any) {
        console.error('Error deleting relation:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the relation',
            error: error.message
        });
    }
};