import express from 'express';
import SchemaManagementService from '../services/SchemaManagementService.ts';
import { loginController } from '../controllers/authController.ts'

const router = express.Router();
const schemaService = SchemaManagementService.getInstance();

console.log("auth routes");

router.post('/create', loginController);



export default router;






