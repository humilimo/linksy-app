import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  await prisma.user.create({
    data:{
        id: 0,
        username: 'linksy',
        name: 'linksy',
        email: 'linksy',
        password: 'linksy'
    }
  });
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })