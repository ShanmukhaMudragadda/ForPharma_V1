import SchemaManagementService from '../services/SchemaManagementService.ts'
import bcrypt from 'bcrypt';

interface OrganizationData {
  name: string;
  email: string;
  address?: string;
  website?: string;
  adminEmail: string;
  adminPassword: string;
  adminFirstName: string;
  adminLastName?: string;
}

async function onboardNewOrganization(organizationData: OrganizationData) {
  const schemaService = new SchemaManagementService();

  try {
    console.log('Starting organization onboarding...');

    // 1. Create organization in shared schema
    const org = await schemaService.sharedDb.organization.create({
      data: {
        name: organizationData.name,
        contactEmail: organizationData.email,
        address: organizationData.address,
        website: organizationData.website
      }
    });

    console.log(`Organization created with ID: ${org.id}`);

    // 2. Create schema for organization
    const schemaName = await schemaService.createOrganizationSchema(
      org.id,
      organizationData.name
    );

    // 3. Create admin user in shared schema ONLY
    const hashedPassword = await bcrypt.hash(organizationData.adminPassword, 10);

    const adminUser = await schemaService.sharedDb.employee.create({
      data: {
        email: organizationData.adminEmail,
        password: hashedPassword,
        firstName: organizationData.adminFirstName,
        lastName: organizationData.adminLastName,
        role: 'SYSTEM_ADMINISTRATOR',
        organizationId: org.id,
        isActive: true
      }
    });

    console.log('Admin user created successfully in shared schema');

    // 4. Initialize any default data in tenant schema if needed
    const tenantDb = await schemaService.getTenantClient(org.id);

    // Example: Create default team
    await tenantDb.team.create({
      data: {
        teamName: 'Default Team',
        leadId: adminUser.id,
        isActive: true
      }
    });

    // Update admin user with team ID in shared schema
    await schemaService.sharedDb.employee.update({
      where: { id: adminUser.id },
      data: { teamId: adminUser.id } // Using same ID for simplicity
    });

    await tenantDb.$disconnect();

    // 5. Close connections
    await schemaService.closeAllConnections();

    return {
      success: true,
      organizationId: org.id,
      schemaName: schemaName,
      adminUserId: adminUser.id
    };

  } catch (error) {
    console.error('Onboarding error:', error);
    await schemaService.closeAllConnections();
    throw error;
  }
}

export default onboardNewOrganization;