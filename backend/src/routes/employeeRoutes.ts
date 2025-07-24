import express from 'express'
const router = express.Router();
import tenantMiddleware from '../middleware/tenantMiddleware'

// Apply tenant middleware to all routes
router.use(tenantMiddleware);

// Get all employees (no organization_id filter needed!)
router.get('/employees', async (req, res) => {
  try {
    const employees = await req.tenantDb.employee.findMany({
      where: { is_active: true }
    });
    
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// Create employee
router.post('/employees', async (req, res) => {
  try {
    const employee = await req.tenantDb.employee.create({
      data: req.body 
    });
    
    res.status(201).json(employee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Failed to create employee' });
  }
});

module.exports = router;