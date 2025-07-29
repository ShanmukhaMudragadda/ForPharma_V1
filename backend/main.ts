import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { loginController, googleLoginController } from './src/controllers/authController.ts';
// createOrganizationController will be imported after schemaService initialization
import employeeRoutes from './src/routes/employeeRoutes.ts';
import { cleanupMiddleware } from './src/middlewares/tenantMiddleware.ts';
import SchemaManagementService from './src/services/SchemaManagementService.ts';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Create a single, global instance of SchemaManagementService
const schemaService = new SchemaManagementService();

/**
 * Initializes the application by loading migrations and setting up the Express server.
 * This function should be called once at application startup.
 */
async function initializeApplication() {
  try {
    console.log('Starting application initialization...');

    // IMPORTANT: Load tenant migrations before any requests can come in
    await schemaService.initializeMigrations();
    console.log('✅ Tenant migrations loaded successfully.');

    // Dynamically import createOrganizationController AFTER schemaService is initialized.
    // This allows us to pass the initialized schemaService instance to it.
    const { createOrganizationController } = await import('./src/controllers/organizationController.ts');

    // Middleware setup
    app.use(cors()); // Enable CORS for all origins
    app.use(express.json()); // Parse JSON request bodies
    app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

    // Request logging middleware
    app.use((req, res, next) => {
      console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
      next();
    });

    // Health check endpoint
    app.get('/', (req, res) => {
      res.json({
        status: 'ok',
        message: 'ForPharma Backend API is running!',
        timestamp: new Date().toISOString()
      });
    });

    // Public routes (no authentication/tenant context required initially)
    app.post('/api/auth/login', loginController);
    // Use the factory pattern to inject the initialized schemaService into the controller
    app.post('/api/auth/register', createOrganizationController(schemaService));
    app.post('/api/auth/googlelogin', googleLoginController);
    app.post('/api/organizations', createOrganizationController(schemaService));

    // Protected routes (these would typically use tenantMiddleware or similar)
    app.use('/api', employeeRoutes);

    // 404 Not Found handler
    app.use((req, res) => {
      res.status(404).json({
        error: 'Not Found',
        message: `Cannot ${req.method} ${req.path}`
      });
    });

    // Centralized Error handling middleware
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error('Error:', err);

      // Handle specific Prisma errors
      if (err.code === 'P2002') { // Unique constraint violation
        return res.status(409).json({
          error: 'Duplicate entry',
          field: err.meta?.target // Provides information about which field caused the error
        });
      }
      if (err.code === 'P2025') { // Record not found
        return res.status(404).json({
          error: 'Record not found',
          details: err.meta?.cause || 'The requested record could not be found.'
        });
      }

      // Generic 500 Internal Server Error for unhandled exceptions
      res.status(500).json({
        error: 'Internal Server Error',
        // In development, send detailed error message; in production, send generic message
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong on the server.'
      });
    });

    // Start the HTTP server
    const PORT = process.env.PORT || 3000;
    const server = app.listen(PORT, () => {
      console.log(`
🚀 ForPharma Backend Server is running!
📡 API URL: http://localhost:${PORT}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
📅 Started at: ${new Date().toISOString()}
      `);
    });

    // Graceful shutdown procedures
    const gracefulShutdown = async (signal: string) => {
      console.log(`\n${signal} signal received: closing HTTP server`);
      server.close(async () => {
        console.log('HTTP server closed');
        try {
          // Attempt to close any connections managed by middleware (if any)
          await cleanupMiddleware();
          // Ensure all Prisma connections managed by schemaService are closed
          await schemaService.closeAllConnections();
          console.log('Database connections closed.');
          process.exit(0); // Exit successfully
        } catch (error) {
          console.error('❌ Error during graceful shutdown:', error);
          process.exit(1); // Exit with error code
        }
      });
    };

    // Listen for termination signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (error) {
    // If application initialization (e.g., migrations loading) fails
    console.error('❌ FATAL: Application initialization failed:', error);
    process.exit(1); // Exit immediately if essential services cannot start
  }
}

// Execute the application initialization function
initializeApplication();