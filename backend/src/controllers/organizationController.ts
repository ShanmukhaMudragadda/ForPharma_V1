import { Request, Response } from 'express';
import onboardNewOrganization from '../scripts/onboardOrganization.ts';

export const createOrganizationController = async (req: Request, res: Response) => {
    try {
        const {
            name,
            email,
            address,
            website,
            adminEmail,
            adminPassword,
            adminFirstName,
            adminLastName
        } = req.body;

        // Validate required fields
        if (!name || !email || !adminEmail || !adminPassword || !adminFirstName) {
            return res.status(400).json({
                error: 'Missing required fields',
                required: ['name', 'email', 'adminEmail', 'adminPassword', 'adminFirstName']
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email) || !emailRegex.test(adminEmail)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Validate password strength (minimum 8 characters)
        if (adminPassword.length < 8) {
            return res.status(400).json({
                error: 'Password must be at least 8 characters long'
            });
        }

        // Create organization
        const result = await onboardNewOrganization({
            name,
            email,
            address,
            website,
            adminEmail,
            adminPassword,
            adminFirstName,
            adminLastName
        });

        res.status(201).json({
            message: 'Organization created successfully',
            organizationId: result.organizationId,
            schemaName: result.schemaName,
            adminUserId: result.adminUserId
        });
    } catch (error: any) {
        console.error('Create organization error:', error);

        // Handle specific errors
        if (error.code === 'P2002') {
            return res.status(409).json({
                error: 'Email already exists'
            });
        }

        res.status(500).json({
            error: 'Failed to create organization',
            details: error.message
        });
    }
};