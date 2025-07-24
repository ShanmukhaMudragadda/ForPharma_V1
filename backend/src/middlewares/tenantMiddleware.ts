import SchemaManagementService from '../services/SchemaManagementService.js';
import { PrismaClient as SharedPrismaClient } from '../generated/prisma-shared/index.js';
import jwt from 'jsonwebtoken';

const schemaService = new SchemaManagementService();
const sharedDb = new SharedPrismaClient();

async function tenantMiddleware(req, res, next) {
  try {
    // Extract token
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify token and get email
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Extract email from token
    const userEmail = decoded.email;
    
    if (!userEmail) {
      return res.status(401).json({ error: 'No email found in token' });
    }

    // Look up user in shared database to get organization ID
    const employeeWithOrg = await sharedDb.employee.findUnique({
      where: { 
        email: userEmail 
      },
      select: {
        employee_id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        organization_id: true,
        organization: {
          select: {
            organization_id: true,
            name: true,
            schemaName: true,
            isActive: true
          }
        }
      }
    });

    if (!employeeWithOrg) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!employeeWithOrg.organization_id) {
      return res.status(400).json({ error: 'User not associated with any organization' });
    }

    // Check if organization is active
    if (!employeeWithOrg.organization?.isActive) {
      return res.status(403).json({ error: 'Organization is not active' });
    }

    // Add user info and organization details to request
    req.user = {
      ...decoded,
      employeeId: employeeWithOrg.employee_id,
      organizationId: employeeWithOrg.organization_id,
      organizationName: employeeWithOrg.organization?.name,
      role: employeeWithOrg.role,
    };

    // Get tenant database connection
    req.tenantDb = await schemaService.getTenantClient(employeeWithOrg.organization_id);

    next();
  } catch (error) {
    console.error('Tenant middleware error:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    
    // Clean up connections on error
    await sharedDb.$disconnect();
    
    res.status(500).json({ error: 'Failed to establish tenant connection' });
  }
}

// Optional: Add cleanup function for graceful shutdown
export async function cleanupMiddleware() {
  await sharedDb.$disconnect();
  await schemaService.closeAllConnections();
}

export default tenantMiddleware;