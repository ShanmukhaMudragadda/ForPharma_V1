import SchemaManagementService from '../services/SchemaManagementService.js';
import bcrypt from 'bcrypt';

async function onboardNewOrganization(organizationData) {
  const schemaService = new SchemaManagementService();
  
  try {
    console.log('Starting organization onboarding...');
    
    // 1. Create organization in shared schema
    const org = await schemaService.sharedDb.organization.create({
      data: {
        name: organizationData.name,
        organizationEmail: organizationData.email,
        headquarterAddress: organizationData.address,
        orgWebsite: organizationData.website
      }
    });
    
    console.log(`Organization created with ID: ${org.organization_id}`);
    
    // 2. Create schema for organization
    const schemaName = await schemaService.createOrganizationSchema(
      org.organization_id,
      organizationData.name
    );
    
    // 3. Create admin user in tenant schema
    const tenantDb = await schemaService.getTenantClient(schemaName);
    
    const hashedPassword = await bcrypt.hash(organizationData.adminPassword, 10);
    
    await tenantDb.employee.create({
      data: {
        email: organizationData.adminEmail,
        password: hashedPassword,
        firstName: organizationData.adminFirstName,
        lastName: organizationData.adminLastName,
        role: 'SYSTEM_ADMINISTRATOR'
      }
    });
    
    console.log('Admin user created successfully');
    
    await tenantDb.$disconnect();
    await schemaService.closeAllConnections();
    
    return {
      success: true,
      organizationId: org.organization_id,
      schemaName: schemaName
    };
    
  } catch (error) {
    console.error('Onboarding error:', error);
    await schemaService.closeAllConnections();
    throw error;
  }
}

export default onboardNewOrganization;