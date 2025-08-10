import express from 'express';
import tenantMiddleware from '../middlewares/tenantMiddleware';
import rcpaController from '../controllers/rcpaController';

const router = express.Router();

// Apply tenant middleware to all RCPA routes
// This ensures all routes have access to req.user and req.tenantDb
router.use(tenantMiddleware);

// RCPA Routes
router.get('/', rcpaController.getRcpaReports);                    // GET /api/rcpa - List all RCPA reports
router.get('/drugs', rcpaController.getDrugsForRcpa);             // GET /api/rcpa/drugs - Get drugs for RCPA creation
router.get('/:rcpaId', rcpaController.getRcpaById);               // GET /api/rcpa/:rcpaId - Get single RCPA report details
router.post('/', rcpaController.createRcpaReport);               // POST /api/rcpa - Create new RCPA report
router.put('/:rcpaId', rcpaController.updateRcpaReport);         // PUT /api/rcpa/:rcpaId - Update RCPA report
router.delete('/:rcpaId', rcpaController.deleteRcpaReport);      // DELETE /api/rcpa/:rcpaId - Delete RCPA report

export default router;