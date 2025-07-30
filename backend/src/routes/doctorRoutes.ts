import express from 'express';
import SchemaManagementService from '../services/SchemaManagementService.ts';


const router = express.Router();
const schemaService = SchemaManagementService.getInstance();





export default router;

