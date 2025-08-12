import { Request, Response } from 'express';

// Extended Request interface to include tenant database and user info
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        employeeId: string;
        organizationId: string;
        email: string;
        role: string;
    };
    tenantDb?: any; // Prisma tenant client
}

interface DCRListItem {
    dcrId: string;
    customerName: string;
    date: string;
    timings: string;
    status: string;
}

interface TaskDetail {
    taskId: string;
    taskType: string;
    name: string;
    date: string;
    address: string;
    timings: string;
}

class DCRController {
    /**
     * GET /api/dcr
     * List DCR reports for authenticated employee
     */
    async getDCRReports(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            console.log('📋 Getting DCR reports for employee:', req.user?.employeeId);

            if (!req.tenantDb) {
                res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
                return;
            }

            // Get search and filter parameters
            const { search, dateRange, customStartDate, customEndDate } = req.query;

            // Build where clause for DCR reports
            let whereClause: any = {
                employeeId: req.user?.employeeId
            };

            // Apply date filter if provided
            if (dateRange || (customStartDate && customEndDate)) {
                const today = new Date();
                let startDate: Date | undefined;
                let endDate: Date = today;

                if (dateRange) {
                    switch (dateRange) {
                        case 'lastWeek':
                            startDate = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                            break;
                        case 'lastMonth':
                            startDate = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
                            break;
                        case 'last3Months':
                            startDate = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);
                            break;
                        case 'last6Months':
                            startDate = new Date(today.getTime() - 180 * 24 * 60 * 60 * 1000);
                            break;
                        case 'lastYear':
                            startDate = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000);
                            break;
                        default:
                            startDate = new Date(0);
                    }
                } else if (customStartDate && customEndDate) {
                    startDate = new Date(customStartDate as string);
                    endDate = new Date(customEndDate as string);
                }

                if (startDate) {
                    whereClause.createdAt = {
                        gte: startDate,
                        lte: endDate
                    };
                }
            }

            // Get DCR reports
            const dcrReports = await req.tenantDb.dcrReport.findMany({
                where: whereClause,
                include: {
                    employee: {
                        select: {
                            firstName: true,
                            lastName: true
                        }
                    }
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });

            // Transform DCR reports to include task details
            const transformedDCRs: DCRListItem[] = [];

            for (const dcr of dcrReports) {
                let customerName = 'Unknown';
                let timings = 'Not specified';

                try {
                    // Determine task type and get details
                    if (dcr.taskType === 'DOCTOR_TASK' && dcr.taskId) {
                        const doctorTask = await req.tenantDb.doctorTask.findUnique({
                            where: { id: dcr.taskId },
                            include: {
                                doctor: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        });

                        if (doctorTask) {
                            customerName = doctorTask.doctor?.name || 'Unknown Doctor';
                            // Format time from database time fields (TIME type)
                            const startTimeStr = doctorTask.startTime.toISOString().substr(11, 5);
                            const endTimeStr = doctorTask.endTime.toISOString().substr(11, 5);

                            // Convert to 12-hour format
                            const formatTime = (timeStr: string): string => {
                                const [hours, minutes] = timeStr.split(':');
                                const hour = parseInt(hours);
                                const ampm = hour >= 12 ? 'PM' : 'AM';
                                const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                                return `${displayHour}:${minutes} ${ampm}`;
                            };

                            timings = `${formatTime(startTimeStr)} - ${formatTime(endTimeStr)}`;
                        }
                    } else if (dcr.taskType === 'CHEMIST_TASK' && dcr.taskId) {
                        const chemistTask = await req.tenantDb.chemistTask.findUnique({
                            where: { id: dcr.taskId },
                            include: {
                                chemist: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        });

                        if (chemistTask) {
                            customerName = chemistTask.chemist?.name || 'Unknown Chemist';
                            // Format time from database time fields (TIME type)
                            const startTimeStr = chemistTask.startTime.toISOString().substr(11, 5);
                            const endTimeStr = chemistTask.endTime.toISOString().substr(11, 5);

                            // Convert to 12-hour format
                            const formatTime = (timeStr: string): string => {
                                const [hours, minutes] = timeStr.split(':');
                                const hour = parseInt(hours);
                                const ampm = hour >= 12 ? 'PM' : 'AM';
                                const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                                return `${displayHour}:${minutes} ${ampm}`;
                            };

                            timings = `${formatTime(startTimeStr)} - ${formatTime(endTimeStr)}`;
                        }
                    } else if (dcr.taskType === 'TOUR_PLAN_TASK' && dcr.taskId) {
                        const tourPlanTask = await req.tenantDb.tourPlanTask.findUnique({
                            where: { id: dcr.taskId },
                            select: {
                                location: true,
                                startTime: true,
                                endTime: true,
                                tourPlan: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        });

                        if (tourPlanTask) {
                            customerName = tourPlanTask.tourPlan?.name || tourPlanTask.location || 'Tour Plan';
                            // Format time from database time fields (TIME type)
                            const startTimeStr = tourPlanTask.startTime.toISOString().substr(11, 5);
                            const endTimeStr = tourPlanTask.endTime.toISOString().substr(11, 5);

                            // Convert to 12-hour format
                            const formatTime = (timeStr: string): string => {
                                const [hours, minutes] = timeStr.split(':');
                                const hour = parseInt(hours);
                                const ampm = hour >= 12 ? 'PM' : 'AM';
                                const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                                return `${displayHour}:${minutes} ${ampm}`;
                            };

                            timings = `${formatTime(startTimeStr)} - ${formatTime(endTimeStr)}`;
                        }
                    }
                } catch (taskError) {
                    console.warn('Error fetching task details for DCR:', dcr.id, taskError);
                    // Continue with default values
                }

                const transformedDCR: DCRListItem = {
                    dcrId: dcr.id,
                    customerName: customerName,
                    date: dcr.createdAt.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    }),
                    timings: timings,
                    status: dcr.isDraft ? 'draft' : 'completed'
                };

                // Apply search filter on backend if provided
                if (search) {
                    const searchTerm = (search as string).toLowerCase();
                    const matchesSearch = transformedDCR.dcrId.toLowerCase().includes(searchTerm) ||
                        transformedDCR.customerName.toLowerCase().includes(searchTerm);

                    if (matchesSearch) {
                        transformedDCRs.push(transformedDCR);
                    }
                } else {
                    transformedDCRs.push(transformedDCR);
                }
            }

            res.status(200).json({
                success: true,
                message: `Retrieved ${transformedDCRs.length} DCR reports`,
                data: transformedDCRs
            });

        } catch (error) {
            console.error('❌ Error getting DCR reports:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve DCR reports',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    /**
     * GET /api/dcr/:dcrId
     * Get detailed information about a specific DCR report
     */
    async getDCRById(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { dcrId } = req.params;
            console.log('🔍 Getting DCR details for:', dcrId);

            if (!req.tenantDb) {
                res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
                return;
            }

            const dcr = await req.tenantDb.dcrReport.findFirst({
                where: {
                    id: dcrId,
                    employeeId: req.user?.employeeId // Ensure user can only access their own DCR
                },
                include: {
                    employee: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true
                        }
                    }
                }
            });

            if (!dcr) {
                res.status(404).json({
                    success: false,
                    message: 'DCR report not found or you do not have permission to view this report'
                });
                return;
            }

            // Get task-specific details - FIXED: Separate the include and select properly
            let taskDetails = null;
            if (dcr.taskType && dcr.taskId) {
                try {
                    if (dcr.taskType === 'DOCTOR_TASK') {
                        taskDetails = await req.tenantDb.doctorTask.findUnique({
                            where: { id: dcr.taskId },
                            select: {
                                taskDate: true,
                                startTime: true,
                                endTime: true,
                                doctor: {
                                    select: {
                                        name: true,
                                        specialization: true,
                                        phone: true,
                                        email: true,
                                        hospitalAssociations: {
                                            where: {
                                                isPrimary: true
                                            },
                                            select: {
                                                hospital: {
                                                    select: {
                                                        name: true,
                                                        address: true,
                                                        city: true,
                                                        state: true
                                                    }
                                                }
                                            },
                                            take: 1
                                        }
                                    }
                                }
                            }
                        });
                    } else if (dcr.taskType === 'CHEMIST_TASK') {
                        taskDetails = await req.tenantDb.chemistTask.findUnique({
                            where: { id: dcr.taskId },
                            select: {
                                taskDate: true,
                                startTime: true,
                                endTime: true,
                                chemist: {
                                    select: {
                                        name: true,
                                        type: true,
                                        phone: true,
                                        email: true,
                                        address: true,
                                        city: true,
                                        state: true
                                    }
                                }
                            }
                        });
                    } else if (dcr.taskType === 'TOUR_PLAN_TASK') {
                        taskDetails = await req.tenantDb.tourPlanTask.findUnique({
                            where: { id: dcr.taskId },
                            select: {
                                taskDate: true,
                                startTime: true,
                                endTime: true,
                                location: true,
                                tourPlan: {
                                    select: {
                                        name: true,
                                        description: true
                                    }
                                }
                            }
                        });
                    }
                } catch (taskError) {
                    console.warn('Error fetching task details:', taskError);
                }
            }

            // Transform DCR details for frontend
            const dcrDetails = {
                dcrId: dcr.id,
                reportDate: dcr.reportDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }),
                status: dcr.isDraft ? 'draft' : 'completed',
                productsDiscussed: dcr.productsDiscussed || '',
                comments: dcr.comments || '',

                // Employee information
                createdBy: {
                    name: `${dcr.employee?.firstName || ''} ${dcr.employee?.lastName || ''}`.trim() || 'Unknown Employee',
                    email: dcr.employee?.email
                },

                // Task information
                taskType: dcr.taskType,
                taskId: dcr.taskId,
                taskDetails: taskDetails,

                // Timestamps
                createdAt: dcr.createdAt,
                updatedAt: dcr.updatedAt
            };

            res.status(200).json({
                success: true,
                message: 'DCR details retrieved successfully',
                data: dcrDetails
            });

        } catch (error) {
            console.error('❌ Error getting DCR details:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve DCR details',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }
    /**
     * GET /api/dcr/tasks/available
     * Get available tasks for DCR creation (COMPLETED and RESCHEDULED tasks)
     */
    async getTasksForDCR(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            console.log('📋 Getting available tasks for DCR creation:', req.user?.employeeId);

            if (!req.tenantDb) {
                res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
                return;
            }

            const availableTasks: TaskDetail[] = [];

            // Get existing DCR task IDs to exclude tasks that already have DCR reports
            const existingDCRs = await req.tenantDb.dcrReport.findMany({
                where: {
                    employeeId: req.user?.employeeId
                },
                select: {
                    taskId: true,
                    taskType: true
                }
            });

            const existingDCRTaskIds = {
                DOCTOR_TASK: existingDCRs.filter(dcr => dcr.taskType === 'DOCTOR_TASK').map(dcr => dcr.taskId),
                CHEMIST_TASK: existingDCRs.filter(dcr => dcr.taskType === 'CHEMIST_TASK').map(dcr => dcr.taskId),
                TOUR_PLAN_TASK: existingDCRs.filter(dcr => dcr.taskType === 'TOUR_PLAN_TASK').map(dcr => dcr.taskId)
            };

            // Format time helper function
            const formatTime = (timeStr: string): string => {
                const [hours, minutes] = timeStr.split(':');
                const hour = parseInt(hours);
                const ampm = hour >= 12 ? 'PM' : 'AM';
                const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
                return `${displayHour}:${minutes} ${ampm}`;
            };

            // Get Doctor Tasks (COMPLETED and RESCHEDULED status, without existing DCR)
            const doctorTasks = await req.tenantDb.doctorTask.findMany({
                where: {
                    employeeId: req.user?.employeeId,
                    taskStatus: {
                        in: ['COMPLETED', 'RESCHEDULED']
                    },
                    ...(existingDCRTaskIds.DOCTOR_TASK.length > 0 ? {
                        id: {
                            notIn: existingDCRTaskIds.DOCTOR_TASK
                        }
                    } : {})
                },
                orderBy: {
                    taskDate: 'desc'
                },
                include: {
                    doctor: {
                        include: {
                            hospitalAssociations: {
                                where: {
                                    isPrimary: true
                                },
                                include: {
                                    hospital: {
                                        select: {
                                            name: true,
                                            address: true,
                                            city: true,
                                            state: true
                                        }
                                    }
                                },
                                take: 1
                            }
                        }
                    }
                }
            });

            for (const task of doctorTasks) {
                const hospital = task.doctor?.hospitalAssociations?.[0]?.hospital;
                const address = hospital
                    ? `${hospital.name}, ${hospital.address}, ${hospital.city || ''}, ${hospital.state || ''}`.replace(/, ,/g, ',').replace(/,$/, '')
                    : 'Hospital address not available';

                // Format time from database time fields (TIME type)
                const startTimeStr = task.startTime.toISOString().substr(11, 5);
                const endTimeStr = task.endTime.toISOString().substr(11, 5);

                availableTasks.push({
                    taskId: task.id,
                    taskType: 'DOCTOR_TASK',
                    name: task.doctor?.name || 'Unknown Doctor',
                    date: task.taskDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }),
                    address: address,
                    timings: `${formatTime(startTimeStr)} - ${formatTime(endTimeStr)}`
                });
            }

            // Get Chemist Tasks (COMPLETED and RESCHEDULED status, without existing DCR)
            const chemistTasks = await req.tenantDb.chemistTask.findMany({
                where: {
                    employeeId: req.user?.employeeId,
                    taskStatus: {
                        in: ['COMPLETED', 'RESCHEDULED']
                    },
                    ...(existingDCRTaskIds.CHEMIST_TASK.length > 0 ? {
                        id: {
                            notIn: existingDCRTaskIds.CHEMIST_TASK
                        }
                    } : {})
                },
                orderBy: {
                    taskDate: 'desc'
                },
                include: {
                    chemist: {
                        select: {
                            name: true,
                            address: true,
                            city: true,
                            state: true
                        }
                    }
                }
            });

            for (const task of chemistTasks) {
                const address = task.chemist
                    ? `${task.chemist.address || ''}, ${task.chemist.city || ''}, ${task.chemist.state || ''}`.replace(/^, |, ,|,$/, '').replace(/^,/, '') || 'Address not available'
                    : 'Chemist address not available';

                // Format time from database time fields (TIME type)
                const startTimeStr = task.startTime.toISOString().substr(11, 5);
                const endTimeStr = task.endTime.toISOString().substr(11, 5);

                availableTasks.push({
                    taskId: task.id,
                    taskType: 'CHEMIST_TASK',
                    name: task.chemist?.name || 'Unknown Chemist',
                    date: task.taskDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }),
                    address: address,
                    timings: `${formatTime(startTimeStr)} - ${formatTime(endTimeStr)}`
                });
            }

            // Get Tour Plan Tasks (COMPLETED and RESCHEDULED status, without existing DCR)
            const tourPlanTasks = await req.tenantDb.tourPlanTask.findMany({
                where: {
                    employeeId: req.user?.employeeId,
                    taskStatus: {
                        in: ['COMPLETED', 'RESCHEDULED']
                    },
                    ...(existingDCRTaskIds.TOUR_PLAN_TASK.length > 0 ? {
                        id: {
                            notIn: existingDCRTaskIds.TOUR_PLAN_TASK
                        }
                    } : {})
                },
                orderBy: {
                    taskDate: 'desc'
                },
                include: {
                    tourPlan: {
                        select: {
                            name: true,
                            description: true
                        }
                    }
                }
            });

            for (const task of tourPlanTasks) {
                // Format time from database time fields (TIME type)
                const startTimeStr = task.startTime.toISOString().substr(11, 5);
                const endTimeStr = task.endTime.toISOString().substr(11, 5);

                availableTasks.push({
                    taskId: task.id,
                    taskType: 'TOUR_PLAN_TASK',
                    name: task.tourPlan?.name || 'Tour Plan',
                    date: task.taskDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    }),
                    address: task.location || 'Location not specified',
                    timings: `${formatTime(startTimeStr)} - ${formatTime(endTimeStr)}`
                });
            }

            // Sort all tasks by date (most recent first)
            availableTasks.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                return dateB.getTime() - dateA.getTime();
            });

            console.log(`Found ${availableTasks.length} available tasks for DCR creation`);

            res.status(200).json({
                success: true,
                message: `Retrieved ${availableTasks.length} available tasks`,
                data: availableTasks
            });

        } catch (error) {
            console.error('❌ Error getting tasks for DCR:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve tasks',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    /**
     * POST /api/dcr
     * Create a new DCR report
     */
    async createDCR(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const dcrData = req.body;
            console.log('📝 Creating new DCR for employee:', req.user?.employeeId);

            if (!req.tenantDb) {
                res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
                return;
            }

            // Validate required fields
            if (!dcrData.taskId || !dcrData.taskType) {
                res.status(400).json({
                    success: false,
                    message: 'Task ID and Task Type are required'
                });
                return;
            }

            // Validate that at least one field is filled
            if (!dcrData.productsDiscussed?.trim() && !dcrData.comments?.trim()) {
                res.status(400).json({
                    success: false,
                    message: 'Either Products Discussed or Comments must be provided'
                });
                return;
            }

            // Get task date based on task type
            let taskDate: Date | undefined;
            let taskExists = false;

            if (dcrData.taskType === 'DOCTOR_TASK') {
                const task = await req.tenantDb.doctorTask.findFirst({
                    where: {
                        id: dcrData.taskId,
                        employeeId: req.user?.employeeId
                    }
                });
                if (task) {
                    taskDate = task.taskDate;
                    taskExists = true;
                }
            } else if (dcrData.taskType === 'CHEMIST_TASK') {
                const task = await req.tenantDb.chemistTask.findFirst({
                    where: {
                        id: dcrData.taskId,
                        employeeId: req.user?.employeeId
                    }
                });
                if (task) {
                    taskDate = task.taskDate;
                    taskExists = true;
                }
            } else if (dcrData.taskType === 'TOUR_PLAN_TASK') {
                const task = await req.tenantDb.tourPlanTask.findFirst({
                    where: {
                        id: dcrData.taskId,
                        employeeId: req.user?.employeeId
                    }
                });
                if (task) {
                    taskDate = task.taskDate;
                    taskExists = true;
                }
            }

            if (!taskExists || !taskDate) {
                res.status(404).json({
                    success: false,
                    message: 'Task not found or you do not have permission to create DCR for this task'
                });
                return;
            }

            // Check if DCR already exists for this task
            const existingDCR = await req.tenantDb.dcrReport.findFirst({
                where: {
                    taskId: dcrData.taskId,
                    taskType: dcrData.taskType,
                    employeeId: req.user?.employeeId
                }
            });

            if (existingDCR) {
                res.status(409).json({
                    success: false,
                    message: 'DCR already exists for this task. Please edit the existing DCR instead.'
                });
                return;
            }

            // Create DCR report
            const dcrReport = await req.tenantDb.dcrReport.create({
                data: {
                    organizationId: req.user?.organizationId,
                    employeeId: req.user?.employeeId,
                    taskId: dcrData.taskId,
                    taskType: dcrData.taskType,
                    reportDate: taskDate,
                    productsDiscussed: dcrData.productsDiscussed?.trim() || null,
                    comments: dcrData.comments?.trim() || null,
                    isDraft: dcrData.isDraft === true
                }
            });

            res.status(201).json({
                success: true,
                message: `DCR ${dcrData.isDraft ? 'saved as draft' : 'submitted'} successfully`,
                data: {
                    dcrId: dcrReport.id,
                    status: dcrReport.isDraft ? 'draft' : 'completed',
                    reportDate: dcrReport.reportDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                }
            });

        } catch (error) {
            console.error('❌ Error creating DCR:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create DCR report',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    /**
     * DELETE /api/dcr/:dcrId
     * Delete a DCR report (only drafts can be deleted)
     */
    async deleteDCR(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { dcrId } = req.params;
            console.log('🗑️ Deleting DCR:', dcrId);

            if (!req.tenantDb) {
                res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
                return;
            }

            // Check if DCR exists and belongs to the user
            const existingDCR = await req.tenantDb.dcrReport.findFirst({
                where: {
                    id: dcrId,
                    employeeId: req.user?.employeeId
                }
            });

            if (!existingDCR) {
                res.status(404).json({
                    success: false,
                    message: 'DCR report not found or you do not have permission to delete this report'
                });
                return;
            }

            // Only allow deleting draft DCRs
            if (!existingDCR.isDraft) {
                res.status(400).json({
                    success: false,
                    message: 'Only draft DCR reports can be deleted'
                });
                return;
            }

            // Delete the DCR
            await req.tenantDb.dcrReport.delete({
                where: {
                    id: dcrId
                }
            });

            res.status(200).json({
                success: true,
                message: 'DCR report deleted successfully',
                data: {
                    deletedDCRId: dcrId
                }
            });

        } catch (error) {
            console.error('❌ Error deleting DCR:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to delete DCR report',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    /**
     * PUT /api/dcr/:dcrId
     * Update an existing DCR report (only drafts can be updated)
     */
    async updateDCR(req: AuthenticatedRequest, res: Response): Promise<void> {
        try {
            const { dcrId } = req.params;
            const updateData = req.body;
            console.log('📝 Updating DCR:', dcrId, 'for employee:', req.user?.employeeId);

            if (!req.tenantDb) {
                res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
                return;
            }

            // Check if DCR exists and belongs to the user
            const existingDCR = await req.tenantDb.dcrReport.findFirst({
                where: {
                    id: dcrId,
                    employeeId: req.user?.employeeId
                }
            });

            if (!existingDCR) {
                res.status(404).json({
                    success: false,
                    message: 'DCR report not found or you do not have permission to update this report'
                });
                return;
            }

            // Only allow updating draft DCRs
            if (!existingDCR.isDraft) {
                res.status(400).json({
                    success: false,
                    message: 'Only draft DCR reports can be updated'
                });
                return;
            }

            // Validate that at least one field is filled
            if (!updateData.productsDiscussed?.trim() && !updateData.comments?.trim()) {
                res.status(400).json({
                    success: false,
                    message: 'Either Products Discussed or Comments must be provided'
                });
                return;
            }

            // Update the DCR report
            const updatedDCR = await req.tenantDb.dcrReport.update({
                where: {
                    id: dcrId
                },
                data: {
                    productsDiscussed: updateData.productsDiscussed?.trim() || null,
                    comments: updateData.comments?.trim() || null,
                    isDraft: updateData.isDraft === true,
                    updatedAt: new Date()
                }
            });

            res.status(200).json({
                success: true,
                message: `DCR ${updateData.isDraft ? 'updated and saved as draft' : 'updated and submitted'} successfully`,
                data: {
                    dcrId: updatedDCR.id,
                    status: updatedDCR.isDraft ? 'draft' : 'completed',
                    reportDate: updatedDCR.reportDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })
                }
            });

        } catch (error) {
            console.error('❌ Error updating DCR:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update DCR report',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }
}



export default new DCRController();