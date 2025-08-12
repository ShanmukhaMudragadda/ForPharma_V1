import express from 'express';
import tenantMiddleware from '../middlewares/tenantMiddleware';
import dcrController from '../controllers/dcrController';

const router = express.Router();

// Apply tenant middleware to all DCR routes
// This ensures all routes have access to req.user and req.tenantDb
router.use(tenantMiddleware);

// DCR Routes
router.get('/', dcrController.getDCRReports);                    // GET /api/dcr - List all DCR reports
router.get('/tasks/available', dcrController.getTasksForDCR);    // GET /api/dcr/tasks/available - Get tasks for DCR creation
router.get('/:dcrId', dcrController.getDCRById);                 // GET /api/dcr/:dcrId - Get single DCR details
router.post('/', dcrController.createDCR);                       // POST /api/dcr - Create new DCR report
router.put('/:dcrId', dcrController.updateDCR);                  // PUT /api/dcr/:dcrId - Update existing DCR report
router.delete('/:dcrId', dcrController.deleteDCR);               // DELETE /api/dcr/:dcrId - Delete DCR report

export default router;