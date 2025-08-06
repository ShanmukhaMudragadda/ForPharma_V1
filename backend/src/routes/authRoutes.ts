import express from 'express';
import SchemaManagementService from '../services/SchemaManagementService';
import { loginController, createUserController, googleLoginController } from '../controllers/authController'

const router = express.Router();
const schemaService = SchemaManagementService.getInstance();


router.post('/create', createUserController);
router.post('/login', loginController);
router.post('/google_login', googleLoginController);



export default router;






