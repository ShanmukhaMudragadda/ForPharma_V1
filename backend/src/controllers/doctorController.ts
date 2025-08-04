import { Request, Response } from 'express';

// Helper function - should be outside the controller
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};






// DoctorConsultationSchedule Controllers 




// Create a new doctor consultation schedule
export const createDoctorConsultationSchedule = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const {
            doctorId,
            hospitalId,
            dayOfWeek,
            startTime,
            endTime,
            consultationType,
            isActive,
            effectiveFrom,
            effectiveTo
        } = req.body;

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!doctorId || !hospitalId || !dayOfWeek || !startTime || !endTime || !consultationType) {
            return res.status(400).json({
                success: false,
                message: 'Doctor ID, Hospital ID, day of week, start time, end time, and consultation type are required'
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

        // Check if hospital exists
        const hospitalExists = await tenantDb.hospital.findUnique({
            where: { id: hospitalId }
        });

        if (!hospitalExists) {
            return res.status(404).json({
                success: false,
                message: 'Hospital not found'
            });
        }

        // Check if doctor is associated with the hospital
        const doctorHospitalAssociation = await tenantDb.doctorHospitalAssociation.findUnique({
            where: {
                doctorId_hospitalId: {
                    doctorId,
                    hospitalId
                }
            }
        });

        if (!doctorHospitalAssociation) {
            return res.status(400).json({
                success: false,
                message: 'Doctor is not associated with this hospital'
            });
        }

        // Check for overlapping schedules
        const overlappingSchedule = await tenantDb.doctorConsultationSchedule.findFirst({
            where: {
                doctorId,
                hospitalId,
                dayOfWeek,
                consultationType,
                isActive: true,
                OR: [
                    {
                        AND: [
                            { startTime: { lte: startTime } },
                            { endTime: { gt: startTime } }
                        ]
                    },
                    {
                        AND: [
                            { startTime: { lt: endTime } },
                            { endTime: { gte: endTime } }
                        ]
                    },
                    {
                        AND: [
                            { startTime: { gte: startTime } },
                            { endTime: { lte: endTime } }
                        ]
                    }
                ]
            }
        });

        if (overlappingSchedule) {
            return res.status(409).json({
                success: false,
                message: 'Schedule overlaps with an existing schedule for this doctor'
            });
        }

        // Create the schedule
        const schedule = await tenantDb.doctorConsultationSchedule.create({
            data: {
                doctorId,
                hospitalId,
                dayOfWeek,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                consultationType,
                isActive: isActive !== undefined ? isActive : true,
                effectiveFrom: effectiveFrom ? new Date(effectiveFrom) : null,
                effectiveTo: effectiveTo ? new Date(effectiveTo) : null
            },
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        specialization: true
                    }
                },
                hospital: {
                    select: {
                        id: true,
                        name: true,
                        city: true
                    }
                }
            }
        });

        return res.status(201).json({
            success: true,
            message: 'Doctor consultation schedule created successfully',
            schedule
        });

    } catch (error: any) {
        console.error('Error creating doctor consultation schedule:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while creating the schedule',
            error: error.message
        });
    }
};


// Get all schedules for a specific doctor
export const getDoctorSchedules = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const doctorId = req.params.doctorId;
        const { hospitalId, isActive } = req.query;

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

        // Build where clause
        const where: any = { doctorId };
        if (hospitalId) where.hospitalId = hospitalId;
        if (isActive !== undefined) where.isActive = isActive === 'true';

        // Fetch all schedules for the doctor
        const schedules = await tenantDb.doctorConsultationSchedule.findMany({
            where,
            include: {
                hospital: {
                    select: {
                        id: true,
                        name: true,
                        address: true,
                        city: true
                    }
                }
            },
            orderBy: [
                { hospitalId: 'asc' },
                { dayOfWeek: 'asc' },
                { startTime: 'asc' }
            ]
        });

        // Group schedules by hospital
        const schedulesByHospital = schedules.reduce((acc: any, schedule: any) => {
            const hospitalId = schedule.hospital.id;
            if (!acc[hospitalId]) {
                acc[hospitalId] = {
                    hospital: schedule.hospital,
                    schedules: []
                };
            }
            acc[hospitalId].schedules.push(schedule);
            return acc;
        }, {});

        return res.status(200).json({
            success: true,
            message: 'Doctor schedules fetched successfully',
            data: {
                doctor: doctorExists,
                schedulesByHospital: Object.values(schedulesByHospital)
            }
        });

    } catch (error: any) {
        console.error('Error fetching doctor schedules:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching doctor schedules',
            error: error.message
        });
    }
};


// Update a doctor consultation schedule
export const updateDoctorConsultationSchedule = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const scheduleId = req.params.scheduleId;
        const {
            dayOfWeek,
            startTime,
            endTime,
            consultationType,
            isActive,
            effectiveFrom,
            effectiveTo
        } = req.body;

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!scheduleId) {
            return res.status(400).json({
                success: false,
                message: 'Schedule ID is required'
            });
        }

        // Check if schedule exists
        const existingSchedule = await tenantDb.doctorConsultationSchedule.findUnique({
            where: { id: scheduleId }
        });

        if (!existingSchedule) {
            return res.status(404).json({
                success: false,
                message: 'Schedule not found'
            });
        }

        // If updating time or day, check for overlaps
        if (dayOfWeek || startTime || endTime) {
            const checkDayOfWeek = dayOfWeek || existingSchedule.dayOfWeek;
            const checkStartTime = startTime ? new Date(startTime) : existingSchedule.startTime;
            const checkEndTime = endTime ? new Date(endTime) : existingSchedule.endTime;
            const checkConsultationType = consultationType || existingSchedule.consultationType;

            const overlappingSchedule = await tenantDb.doctorConsultationSchedule.findFirst({
                where: {
                    doctorId: existingSchedule.doctorId,
                    hospitalId: existingSchedule.hospitalId,
                    dayOfWeek: checkDayOfWeek,
                    consultationType: checkConsultationType,
                    isActive: true,
                    NOT: { id: scheduleId },
                    OR: [
                        {
                            AND: [
                                { startTime: { lte: checkStartTime } },
                                { endTime: { gt: checkStartTime } }
                            ]
                        },
                        {
                            AND: [
                                { startTime: { lt: checkEndTime } },
                                { endTime: { gte: checkEndTime } }
                            ]
                        },
                        {
                            AND: [
                                { startTime: { gte: checkStartTime } },
                                { endTime: { lte: checkEndTime } }
                            ]
                        }
                    ]
                }
            });

            if (overlappingSchedule) {
                return res.status(409).json({
                    success: false,
                    message: 'Updated schedule would overlap with an existing schedule'
                });
            }
        }

        // Update the schedule
        const updatedSchedule = await tenantDb.doctorConsultationSchedule.update({
            where: { id: scheduleId },
            data: {
                dayOfWeek,
                startTime: startTime ? new Date(startTime) : undefined,
                endTime: endTime ? new Date(endTime) : undefined,
                consultationType,
                isActive,
                effectiveFrom: effectiveFrom ? new Date(effectiveFrom) : undefined,
                effectiveTo: effectiveTo ? new Date(effectiveTo) : undefined
            },
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        specialization: true
                    }
                },
                hospital: {
                    select: {
                        id: true,
                        name: true,
                        city: true
                    }
                }
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Schedule updated successfully',
            schedule: updatedSchedule
        });

    } catch (error: any) {
        console.error('Error updating schedule:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while updating the schedule',
            error: error.message
        });
    }
};

// Delete a doctor consultation schedule
export const deleteDoctorConsultationSchedule = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const scheduleId = req.params.scheduleId;

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!scheduleId) {
            return res.status(400).json({
                success: false,
                message: 'Schedule ID is required'
            });
        }

        // Check if schedule exists
        const schedule = await tenantDb.doctorConsultationSchedule.findUnique({
            where: { id: scheduleId }
        });

        if (!schedule) {
            return res.status(404).json({
                success: false,
                message: 'Schedule not found'
            });
        }

        // Delete the schedule
        await tenantDb.doctorConsultationSchedule.delete({
            where: { id: scheduleId }
        });

        return res.status(200).json({
            success: true,
            message: 'Schedule deleted successfully'
        });

    } catch (error: any) {
        console.error('Error deleting schedule:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while deleting the schedule',
            error: error.message
        });
    }
};

// Toggle schedule active status
export const toggleScheduleStatus = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const scheduleId = req.params.scheduleId;

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!scheduleId) {
            return res.status(400).json({
                success: false,
                message: 'Schedule ID is required'
            });
        }

        // Check if schedule exists
        const schedule = await tenantDb.doctorConsultationSchedule.findUnique({
            where: { id: scheduleId }
        });

        if (!schedule) {
            return res.status(404).json({
                success: false,
                message: 'Schedule not found'
            });
        }

        // Toggle the active status
        const updatedSchedule = await tenantDb.doctorConsultationSchedule.update({
            where: { id: scheduleId },
            data: {
                isActive: !schedule.isActive
            },
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                hospital: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        return res.status(200).json({
            success: true,
            message: `Schedule ${updatedSchedule.isActive ? 'activated' : 'deactivated'} successfully`,
            schedule: updatedSchedule
        });

    } catch (error: any) {
        console.error('Error toggling schedule status:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while toggling schedule status',
            error: error.message
        });
    }
};


// DoctorNote controllers


// Create a new doctor note
export const createDoctorNote = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const { doctorId, content } = req.body;
        const createdById = req.user?.id; // Assuming user info is attached to request

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!doctorId || !content) {
            return res.status(400).json({
                success: false,
                message: 'Doctor ID and content are required'
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
        const note = await tenantDb.doctorNote.create({
            data: {
                doctorId,
                createdById,
                content: content.trim()
            },
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        specialization: true
                    }
                }
            }
        });

        return res.status(201).json({
            success: true,
            message: 'Doctor note created successfully',
            note
        });

    } catch (error: any) {
        console.error('Error creating doctor note:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while creating the note',
            error: error.message
        });
    }
};



// Get all notes for a specific doctor
export const getNotesForDoctor = async (req: Request, res: Response) => {
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
                specialization: true,
                designation: true
            }
        });

        if (!doctorExists) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Build where clause
        const where: any = { doctorId };

        // Fetch notes for the doctor
        const notes = await tenantDb.doctorNote.findMany({
            where,
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Doctor notes fetched successfully',
            data: {
                doctor: doctorExists,
                notes,
            }
        });

    } catch (error: any) {
        console.error('Error fetching doctor notes:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching doctor notes',
            error: error.message
        });
    }
};

// Get all notes created by a specific employee
export const getNotesByEmployee = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const employeeId = req.params.employeeId;

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

        // Fetch notes created by the employee
        const notes = await tenantDb.doctorNote.findMany({
            where,
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        specialization: true,
                        designation: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Employee notes fetched successfully',
            data: {
                employee: employeeExists,
                notes,
            }
        });

    } catch (error: any) {
        console.error('Error fetching employee notes:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching employee notes',
            error: error.message
        });
    }
};

// Update a doctor note
export const updateDoctorNote = async (req: Request, res: Response) => {
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
        const existingNote = await tenantDb.doctorNote.findUnique({
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
        const updatedNote = await tenantDb.doctorNote.update({
            where: { id: noteId },
            data: {
                content: content.trim()
            },
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        specialization: true
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

// Delete a doctor note
export const deleteDoctorNote = async (req: Request, res: Response) => {
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
        const note = await tenantDb.doctorNote.findUnique({
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
        await tenantDb.doctorNote.delete({
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



// DoctorInteraction

// Create a new doctor interaction
export const createDoctorInteraction = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const {
            doctorId,
            hospitalId,
            interactionType,
            startTime,
            endTime,
            purpose,
            outcome,
            comments,
            rating,
            doctorTaskId
        } = req.body;
        const employeeId = req.user?.id; // Assuming user info is attached to request

        // Validation
        if (!tenantDb) {
            return res.status(500).json({
                success: false,
                message: 'Tenant database connection not established'
            });
        }

        if (!doctorId || !interactionType || !startTime) {
            return res.status(400).json({
                success: false,
                message: 'Doctor ID, interaction type, and start time are required'
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

        // Check if hospital exists (if provided)
        if (hospitalId) {
            const hospitalExists = await tenantDb.hospital.findUnique({
                where: { id: hospitalId }
            });

            if (!hospitalExists) {
                return res.status(404).json({
                    success: false,
                    message: 'Hospital not found'
                });
            }
        }

        // Check if task exists (if provided)
        if (doctorTaskId) {
            const taskExists = await tenantDb.doctorTask.findUnique({
                where: { id: doctorTaskId }
            });

            if (!taskExists) {
                return res.status(404).json({
                    success: false,
                    message: 'Doctor task not found'
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
        const interaction = await tenantDb.doctorInteraction.create({
            data: {
                doctorId,
                employeeId,
                hospitalId,
                interactionType,
                startTime: startDateTime,
                endTime: endDateTime,
                purpose: purpose?.trim(),
                outcome: outcome?.trim(),
                comments: comments?.trim(),
                rating,
                doctorTaskId
            },
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        specialization: true,
                        designation: true
                    }
                },
                employee: {
                    select: {
                        id: true,
                        email: true,
                        role: true
                    }
                },
                hospital: hospitalId ? {
                    select: {
                        id: true,
                        name: true,
                        city: true
                    }
                } : false,
                DoctorTask: doctorTaskId ? {
                    select: {
                        id: true,
                        taskStatus: true
                    }
                } : false
            }
        });

        return res.status(201).json({
            success: true,
            message: 'Doctor interaction created successfully',
            interaction
        });

    } catch (error: any) {
        console.error('Error creating doctor interaction:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while creating the interaction',
            error: error.message
        });
    }
};

// Get all interactions for a specific doctor
export const getInteractionsForDoctor = async (req: Request, res: Response) => {
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
                specialization: true,
                designation: true
            }
        });

        if (!doctorExists) {
            return res.status(404).json({
                success: false,
                message: 'Doctor not found'
            });
        }

        // Build where clause
        const where: any = { doctorId };


        // Fetch interactions
        const interactions = await tenantDb.doctorInteraction.findMany({
            where,
            include: {
                employee: {
                    select: {
                        id: true,
                        email: true,
                        role: true
                    }
                },
                hospital: {
                    select: {
                        id: true,
                        name: true,
                        city: true
                    }
                }
            },
            orderBy: {
                startTime: 'desc'
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Doctor interactions fetched successfully',
            data: {
                doctor: doctorExists,
                interactions,
            }
        });

    } catch (error: any) {
        console.error('Error fetching doctor interactions:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching doctor interactions',
            error: error.message
        });
    }
};

// Get all interactions by an employee
export const getInteractionsByEmployee = async (req: Request, res: Response) => {
    try {
        const tenantDb = req.tenantDb;
        const employeeId = req.params.employeeId;
        const {
            doctorId,
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
        if (doctorId) where.doctorId = doctorId;
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
        const totalCount = await tenantDb.doctorInteraction.count({ where });

        // Get today's interactions count
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayCount = await tenantDb.doctorInteraction.count({
            where: {
                employeeId,
                startTime: { gte: today }
            }
        });

        // Fetch interactions
        const interactions = await tenantDb.doctorInteraction.findMany({
            where,
            skip,
            take,
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        specialization: true,
                        designation: true
                    }
                },
                hospital: {
                    select: {
                        id: true,
                        name: true,
                        city: true
                    }
                }
            },
            orderBy: {
                startTime: 'desc'
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Employee interactions fetched successfully',
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
        console.error('Error fetching employee interactions:', error);
        return res.status(500).json({
            success: false,
            message: 'An error occurred while fetching employee interactions',
            error: error.message
        });
    }
};

// Update a doctor interaction
export const updateDoctorInteraction = async (req: Request, res: Response) => {
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
        const existingInteraction = await tenantDb.doctorInteraction.findUnique({
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
        const updatedInteraction = await tenantDb.doctorInteraction.update({
            where: { id: interactionId },
            data: {
                endTime: endTime ? new Date(endTime) : undefined,
                purpose: purpose?.trim(),
                outcome: outcome?.trim(),
                comments: comments?.trim(),
                rating
            },
            include: {
                doctor: {
                    select: {
                        id: true,
                        name: true,
                        specialization: true
                    }
                },
                employee: {
                    select: {
                        id: true,
                        email: true,
                        role: true
                    }
                },
                hospital: {
                    select: {
                        id: true,
                        name: true,
                        city: true
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

// Delete a doctor interaction
export const deleteDoctorInteraction = async (req: Request, res: Response) => {
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
        const interaction = await tenantDb.doctorInteraction.findUnique({
            where: { id: interactionId },
            include: {
                DoctorDistribution: true
            }
        });

        if (!interaction) {
            return res.status(404).json({
                success: false,
                message: 'Interaction not found'
            });
        }

        // Check if interaction has related distributions
        if (interaction.DoctorDistribution && interaction.DoctorDistribution.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete interaction with associated distributions'
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
        await tenantDb.doctorInteraction.delete({
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






