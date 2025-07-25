import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient as SharedPrismaClient } from '../../generated/prisma-shared/index.js';

const sharedDb = new SharedPrismaClient();

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find employee in shared database
        const employee = await sharedDb.employee.findUnique({
            where: { email },
            include: {
                organization: true
            }
        });

        if (!employee) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if employee is active
        if (!employee.isActive) {
            return res.status(403).json({ error: 'Account is deactivated' });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, employee.password);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if organization is active
        if (!employee.organization?.isActive) {
            return res.status(403).json({ error: 'Organization is not active' });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                id: employee.id,
                email: employee.email,
                organizationId: employee.organizationId,
                role: employee.role
            },
            process.env.JWT_SECRET!,
            { expiresIn: '24h' }
        );

        // Update last login
        await sharedDb.employee.update({
            where: { id: employee.id },
            data: { lastLoginAt: new Date() }
        });

        res.json({
            token,
            user: {
                id: employee.id,
                email: employee.email,
                firstName: employee.firstName,
                lastName: employee.lastName,
                role: employee.role,
                organization: {
                    id: employee.organization.id,
                    name: employee.organization.name
                }
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    } finally {
        await sharedDb.$disconnect();
    }
};