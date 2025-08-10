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

class RcpaController {

    /**
     * GET /api/rcpa
     * List only RCPA reports created by the authenticated employee
     */
    async getRcpaReports(req: AuthenticatedRequest, res: Response) {
        try {
            console.log('📋 Getting RCPA reports for employee:', req.user?.employeeId);

            if (!req.tenantDb) {
                return res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
            }

            const rcpaReports = await req.tenantDb.rcpaReport.findMany({
                where: {
                    employeeId: req.user?.employeeId
                },
                include: {
                    chemist: {
                        select: {
                            id: true,
                            name: true,
                            address: true
                        }
                    },
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

            // Transform data to match frontend expectations
            const transformedReports = rcpaReports.map((report: any) => ({
                id: report.id,
                chemistName: report.chemist?.name || 'Unknown Chemist',
                chemistAddress: report.chemist?.address || '',
                observationDate: report.createdAt.toISOString().split('T')[0], // Format as YYYY-MM-DD
                totalPrescriptions: report.totalPrescription || 0,
                startDate: report.startDate,
                endDate: report.endDate,
                reportingPeriod: report.reportingPeriod
            }));

            res.status(200).json({
                success: true,
                message: `Retrieved ${transformedReports.length} RCPA reports for employee`,
                data: transformedReports
            });

        } catch (error) {
            console.error('❌ Error getting RCPA reports:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve RCPA reports',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    /**
     * GET /api/rcpa/:rcpaId
     * Get detailed information about a specific RCPA report
     */
    async getRcpaById(req: AuthenticatedRequest, res: Response) {
        try {
            const { rcpaId } = req.params;
            console.log('🔍 Getting RCPA details for:', rcpaId);

            if (!req.tenantDb) {
                return res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
            }

            const rcpaReport = await req.tenantDb.rcpaReport.findFirst({
                where: {
                    id: rcpaId,
                    employeeId: req.user?.employeeId // Ensure user can only access their own reports
                },
                include: {
                    chemist: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            phone: true,
                            address: true,
                            city: true,
                            state: true,
                            pincode: true,
                            type: true
                        }
                    },
                    employee: {
                        select: {
                            firstName: true,
                            lastName: true,
                            email: true
                        }
                    },
                    drugData: {
                        include: {
                            drug: {
                                select: {
                                    id: true,
                                    name: true,
                                    composition: true,
                                    manufacturer: true,
                                    category: true
                                }
                            }
                        },
                        orderBy: {
                            createdAt: 'asc'
                        }
                    }
                }
            });

            if (!rcpaReport) {
                return res.status(404).json({
                    success: false,
                    message: 'RCPA report not found or you do not have permission to view this report'
                });
            }

            // Transform drug data into audit items format expected by frontend
            const auditItems = rcpaReport.drugData.map((drugData: any) => {
                const ourProduct = {
                    id: drugData.drugId || `own-${drugData.id}`,
                    name: drugData.drug?.name || 'Unknown Product',
                    quantity: drugData.ownQuantity,
                    packSize: drugData.ownPackSize,
                    manufacturer: drugData.drug?.manufacturer || 'N/A'
                };

                const competitor = {
                    id: `competitor-${drugData.id}`,
                    name: drugData.competitorDrugName || 'Unknown Competitor',
                    quantity: drugData.competitorQuantity,
                    packSize: drugData.competitorPackSize,
                    manufacturer: 'N/A'
                };

                return {
                    id: drugData.id,
                    ourProduct,
                    competitor
                };
            });

            // Calculate competitors found (unique competitor drug names)
            const uniqueCompetitors = new Set();
            rcpaReport.drugData.forEach((drugData: any) => {
                if (drugData.competitorDrugName) {
                    uniqueCompetitors.add(drugData.competitorDrugName);
                }
            });

            // Build full address string
            const addressParts = [
                rcpaReport.chemist?.address,
                rcpaReport.chemist?.city,
                rcpaReport.chemist?.state,
                rcpaReport.chemist?.pincode
            ].filter(Boolean);
            const fullAddress = addressParts.length > 0 ? addressParts.join(', ') : 'Address not available';

            // Transform RCPA details for frontend (matching the expected structure)
            const rcpaDetails = {
                // Basic info
                rcpaId: rcpaReport.id,
                chemistId: rcpaReport.chemist?.id || '',
                chemistName: rcpaReport.chemist?.name || 'Unknown Chemist',

                // Dates
                observationDate: rcpaReport.createdAt.toISOString(),

                // Employee info
                createdBy: {
                    name: `${rcpaReport.employee?.firstName || ''} ${rcpaReport.employee?.lastName || ''}`.trim() || 'Unknown Employee',
                    email: rcpaReport.employee?.email || ''
                },

                // Statistics
                totalPrescriptions: rcpaReport.totalPrescription || 0,
                itemsAudited: rcpaReport.drugData.length,
                competitorsFound: uniqueCompetitors.size,

                // Location info
                region: `${rcpaReport.chemist?.city || 'Unknown'}, ${rcpaReport.chemist?.state || 'Unknown'}`,

                // Remarks
                briefRemarks: rcpaReport.remarks || '',

                // Audit items
                auditItems: auditItems,

                // Additional chemist details
                chemistDetails: {
                    email: rcpaReport.chemist?.email,
                    phone: rcpaReport.chemist?.phone,
                    address: fullAddress,
                    type: rcpaReport.chemist?.type
                },

                // Meta info
                reportingPeriod: rcpaReport.reportingPeriod,
                startDate: rcpaReport.startDate.toISOString(),
                endDate: rcpaReport.endDate.toISOString(),
                createdAt: rcpaReport.createdAt.toISOString(),
                updatedAt: rcpaReport.updatedAt.toISOString()
            };

            res.status(200).json({
                success: true,
                message: 'RCPA report details retrieved successfully',
                data: rcpaDetails
            });

        } catch (error) {
            console.error('❌ Error getting RCPA details:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve RCPA details',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    /**
     * POST /api/rcpa
     * Create a new RCPA report
     */
    async createRcpaReport(req: AuthenticatedRequest, res: Response) {
        try {
            const rcpaData = req.body;
            console.log('📝 Creating new RCPA report for employee:', req.user?.employeeId);

            if (!req.tenantDb) {
                return res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
            }

            // Validate required fields
            if (!rcpaData.chemistId || !rcpaData.reportingPeriod || !rcpaData.startDate || !rcpaData.endDate) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields: chemistId, reportingPeriod, startDate, and endDate are required'
                });
            }

            // Validate chemist exists
            const chemist = await req.tenantDb.chemist.findFirst({
                where: {
                    id: rcpaData.chemistId,
                    isActive: true
                }
            });

            if (!chemist) {
                return res.status(404).json({
                    success: false,
                    message: 'Chemist not found or inactive'
                });
            }

            // Parse dates
            const startDate = new Date(rcpaData.startDate);
            const endDate = new Date(rcpaData.endDate);

            if (startDate >= endDate) {
                return res.status(400).json({
                    success: false,
                    message: 'Start date must be before end date'
                });
            }

            // Create RCPA report with transaction
            const result = await req.tenantDb.$transaction(async (tx: any) => {
                // Create RCPA report
                const rcpaReport = await tx.rcpaReport.create({
                    data: {
                        organizationId: req.user?.organizationId,
                        employeeId: req.user?.employeeId,
                        chemistId: rcpaData.chemistId,
                        reportingPeriod: rcpaData.reportingPeriod,
                        startDate: startDate,
                        endDate: endDate,
                        totalPrescription: rcpaData.totalPrescriptions || null,
                        remarks: rcpaData.remarks || null
                    }
                });

                // Create drug data if provided
                if (rcpaData.drugData && Array.isArray(rcpaData.drugData)) {
                    for (const drugItem of rcpaData.drugData) {
                        await tx.rcpaDrugData.create({
                            data: {
                                rcpaReportId: rcpaReport.id,
                                drugId: drugItem.drugId || null,
                                competitorDrugName: drugItem.competitorDrugName || null,
                                ownQuantity: drugItem.ownQuantity || 0,
                                competitorQuantity: drugItem.competitorQuantity || 0,
                                ownPackSize: drugItem.ownPackSize || '',
                                competitorPackSize: drugItem.competitorPackSize || ''
                            }
                        });
                    }
                }

                return rcpaReport;
            });

            // Fetch created report with relations for response
            const createdReport = await req.tenantDb.rcpaReport.findUnique({
                where: { id: result.id },
                include: {
                    chemist: {
                        select: {
                            id: true,
                            name: true
                        }
                    },
                    employee: {
                        select: {
                            firstName: true,
                            lastName: true
                        }
                    },
                    drugData: true
                }
            });

            res.status(201).json({
                success: true,
                message: 'RCPA report created successfully',
                data: {
                    rcpaId: createdReport.id,
                    chemistName: createdReport.chemist?.name,
                    reportingPeriod: createdReport.reportingPeriod,
                    totalPrescriptions: createdReport.totalPrescription,
                    drugCount: createdReport.drugData.length,
                    createdBy: `${createdReport.employee?.firstName || ''} ${createdReport.employee?.lastName || ''}`.trim()
                }
            });

        } catch (error) {
            console.error('❌ Error creating RCPA report:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to create RCPA report',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    /**
     * PUT /api/rcpa/:rcpaId
     * Update RCPA report details
     */
    async updateRcpaReport(req: AuthenticatedRequest, res: Response) {
        try {
            const { rcpaId } = req.params;
            const rcpaData = req.body;
            console.log('📝 Updating RCPA report:', rcpaId);

            if (!req.tenantDb) {
                return res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
            }

            // Check if report exists and belongs to the user
            const existingReport = await req.tenantDb.rcpaReport.findFirst({
                where: {
                    id: rcpaId,
                    employeeId: req.user?.employeeId
                }
            });

            if (!existingReport) {
                return res.status(404).json({
                    success: false,
                    message: 'RCPA report not found or you do not have permission to update this report'
                });
            }

            // Update RCPA report with transaction
            const result = await req.tenantDb.$transaction(async (tx: any) => {
                // Update RCPA report
                const updatedReport = await tx.rcpaReport.update({
                    where: { id: rcpaId },
                    data: {
                        totalPrescription: rcpaData.totalPrescriptions,
                        remarks: rcpaData.remarks,
                        updatedAt: new Date()
                    }
                });

                // Update drug data if provided
                if (rcpaData.drugData && Array.isArray(rcpaData.drugData)) {
                    // Delete existing drug data
                    await tx.rcpaDrugData.deleteMany({
                        where: { rcpaReportId: rcpaId }
                    });

                    // Create new drug data
                    for (const drugItem of rcpaData.drugData) {
                        await tx.rcpaDrugData.create({
                            data: {
                                rcpaReportId: rcpaId,
                                drugId: drugItem.drugId || null,
                                competitorDrugName: drugItem.competitorDrugName || null,
                                ownQuantity: drugItem.ownQuantity || 0,
                                competitorQuantity: drugItem.competitorQuantity || 0,
                                ownPackSize: drugItem.ownPackSize || '',
                                competitorPackSize: drugItem.competitorPackSize || ''
                            }
                        });
                    }
                }

                return updatedReport;
            });

            res.status(200).json({
                success: true,
                message: 'RCPA report updated successfully',
                data: {
                    rcpaId: result.id,
                    totalPrescriptions: result.totalPrescription,
                    updatedAt: result.updatedAt
                }
            });

        } catch (error) {
            console.error('❌ Error updating RCPA report:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to update RCPA report',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }

    /**
     * DELETE /api/rcpa/:rcpaId
     * Delete RCPA report and its drug data
     */
    async deleteRcpaReport(req: AuthenticatedRequest, res: Response) {
        try {
            const { rcpaId } = req.params;
            console.log('🗑️ Deleting RCPA report:', rcpaId);

            if (!req.tenantDb) {
                return res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
            }

            // Check if report exists and belongs to the user
            const existingReport = await req.tenantDb.rcpaReport.findFirst({
                where: {
                    id: rcpaId,
                    employeeId: req.user?.employeeId
                },
                include: {
                    chemist: {
                        select: {
                            name: true
                        }
                    }
                }
            });

            if (!existingReport) {
                return res.status(404).json({
                    success: false,
                    message: 'RCPA report not found or you do not have permission to delete this report'
                });
            }

            // Store report info for response before deletion
            const reportInfo = {
                rcpaId: existingReport.id,
                chemistName: existingReport.chemist?.name || 'Unknown Chemist',
                totalPrescriptions: existingReport.totalPrescription
            };

            // Delete RCPA report and its drug data in a transaction
            await req.tenantDb.$transaction(async (tx: any) => {
                console.log('🔥 Deleting drug data for RCPA report:', rcpaId);

                // Delete all drug data first (foreign key constraint)
                const deletedDrugData = await tx.rcpaDrugData.deleteMany({
                    where: { rcpaReportId: rcpaId }
                });

                console.log(`✅ Deleted ${deletedDrugData.count} drug data entries`);

                console.log('🔥 Deleting RCPA report:', rcpaId);

                // Delete the RCPA report itself
                const deletedReport = await tx.rcpaReport.delete({
                    where: { id: rcpaId }
                });

                console.log('✅ RCPA report deleted successfully');

                return deletedReport;
            });

            res.status(200).json({
                success: true,
                message: 'RCPA report and all its data have been permanently deleted',
                data: {
                    deletedReport: reportInfo,
                    deletedAt: new Date().toISOString()
                }
            });

        } catch (error) {
            console.error('❌ Error deleting RCPA report:', error);

            // Check if it's a foreign key constraint error
            if (error.code === 'P2003') {
                return res.status(400).json({
                    success: false,
                    message: 'Cannot delete RCPA report due to existing references. Please contact support.'
                });
            }

            // Check if it's a record not found error
            if (error.code === 'P2025') {
                return res.status(404).json({
                    success: false,
                    message: 'RCPA report not found or already deleted'
                });
            }

            res.status(500).json({
                success: false,
                message: 'Failed to delete RCPA report',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }

    /**
     * GET /api/rcpa/drugs
     * Get available drugs for RCPA creation (simplified - no pack size)
     */
    async getDrugsForRcpa(req: AuthenticatedRequest, res: Response) {
        try {
            console.log('💊 Getting drugs for RCPA creation');

            if (!req.tenantDb) {
                return res.status(500).json({
                    success: false,
                    message: 'Tenant database connection not available'
                });
            }

            const drugs = await req.tenantDb.drug.findMany({
                where: {
                    isActive: true,
                    isAvailable: true
                },
                select: {
                    id: true,
                    name: true,
                    composition: true,
                    manufacturer: true,
                    category: true,
                    price: true
                },
                orderBy: {
                    name: 'asc'
                }
            });

            // Transform drugs for RCPA (pack size will be entered manually by user)
            const transformedDrugs = drugs.map(drug => ({
                id: drug.id,
                name: drug.name,
                composition: drug.composition,
                manufacturer: drug.manufacturer || 'N/A',
                category: drug.category,
                price: drug.price ? parseFloat(drug.price.toString()) : 0
            }));

            res.status(200).json({
                success: true,
                message: `Retrieved ${transformedDrugs.length} drugs for RCPA`,
                data: transformedDrugs
            });

        } catch (error) {
            console.error('❌ Error getting drugs for RCPA:', error);
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve drugs for RCPA',
                error: process.env.NODE_ENV === 'development' ? error : undefined
            });
        }
    }
}

export default new RcpaController();