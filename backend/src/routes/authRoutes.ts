import express from 'express';
import SchemaManagementService from '../services/SchemaManagementService';
import { loginController } from '../controllers/authController'

const router = express.Router();
const schemaService = SchemaManagementService.getInstance();


// router.post('/create', loginController);
router.post('/login', loginController);



export default router;






