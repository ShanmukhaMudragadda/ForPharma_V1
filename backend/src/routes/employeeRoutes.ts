import express, { Request, Response } from 'express';
import tenantMiddleware from '../middlewares/tenantMiddleware.js';

const router = express.Router();

// Apply tenant middleware to all routes
router.use(tenantMiddleware);

// Get all employees (from shared database, filtered by organization)
router.get('/employees', async (req: Request, res: Response) => {
  try {
    // Note: Since employees are in shared DB, we should get them from there
    // But you might want to store some employee data in tenant DB too
    const { PrismaClient: SharedPrismaClient } = await import('../../generated/prisma-shared/index.js');
    const sharedDb = new SharedPrismaClient();

    const employees = await sharedDb.employee.findMany({
      where: {
        organizationId: req.user?.organizationId,
        isActive: true
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        phone: true,
        employeeCode: true,
        teamId: true,
        createdAt: true,
        isActive: true
      }
    });

    await sharedDb.$disconnect();
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// Create employee
router.post('/employees', async (req: Request, res: Response) => {
  try {
    const { PrismaClient: SharedPrismaClient } = await import('../../generated/prisma-shared/index.js');
    const sharedDb = new SharedPrismaClient();

    // Hash password if provided
    let hashedPassword = req.body.password;
    if (req.body.password) {
      const bcrypt = await import('bcrypt');
      hashedPassword = await bcrypt.hash(req.body.password, 10);
    }

    const employee = await sharedDb.employee.create({
      data: {
        ...req.body,
        password: hashedPassword,
        organizationId: req.user?.organizationId
      }
    });

    await sharedDb.$disconnect();

    // Remove password from response
    const { password, ...employeeWithoutPassword } = employee;
    res.status(201).json(employeeWithoutPassword);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Failed to create employee' });
  }
});

// Get tenant-specific data example (e.g., doctors)
router.get('/doctors', async (req: Request, res: Response) => {
  try {
    const doctors = await req.tenantDb!.doctor.findMany({
      where: { isActive: true },
      include: {
        hospitalAssociations: {
          include: {
            hospital: true
          }
        }
      }
    });

    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

export default router;