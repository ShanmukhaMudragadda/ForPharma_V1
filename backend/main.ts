import { PrismaClient } from './generated/prisma/index.js'
import express from 'express'


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Express server is running!');
});

app.listen(3000, () => {
  console.log('Server listening on http://localhost:3000');
});


const prisma = new PrismaClient();

async function main() {
}
main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())