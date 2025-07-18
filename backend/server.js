

import { PrismaClient } from './generated/prisma/index.js'
const prisma = new PrismaClient();
async function main() {
  // const newUser = await prisma.user.create({
  //   data:{
  //       email:'prateek@gmail.com',
  //       password:'Prateek@123',
  //       name:'Prateek Nagar'
  //   }
  // })

  // const newUser1 = await prisma.user.create({
  //   data:{
  //     email:"ravi@example.com",
  //     password:"ravi@123",
  //     name:"Ravi"
  //   }
  // })
  // console.log('Created User: ' , newUser1);
  // console.log('Created User: ' , newUser);


//   const userByEmail = await prisma.user.findUnique({
//   where: { email: 'alice@example.com' }
// });
// console.log('User found by email:', userByEmail);



// const allUsers = await prisma.user.findMany();
// console.log('All users:', allUsers);


const updateUser = await prisma.user.update({
  where: { id:1 },
  data: { name: 'Arpit Sixer' }
});
console.log('Updated user:', updateUser);

const allusers = await prisma.user.findMany();
console.log(allUsers);


// const deleteUser = await prisma.user.delete({
//   where: { email: 'alice@example.com' }
// });
// console.log('Deleted user:', deleteUser);


// const recentUsers = await prisma.user.findMany({
//   where: {
//     createdAt: {
//       gte: new Date('2025-01-01')
//     }
//   }
// });
// console.log('Recent users:', recentUsers);


}
main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())