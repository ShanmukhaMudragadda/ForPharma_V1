
import express from 'express'
const tenantMiddleware = require('./middleware/tenantMiddleware');


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express server is running!');
});

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});

app.post('/api/auth/login', loginController);
app.post('/api/organizations', createOrganizationController);

// Protected routes (need tenant)
app.use('/api', tenantMiddleware);
app.use('/api', require('./routes/employeeRoutes'));


const prisma = new PrismaClient();

async function main() {
}
main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())



