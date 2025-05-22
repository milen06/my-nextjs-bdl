// prisma/seed.js
import { prisma } from '../lib/prisma.js'

async function main() {
  await prisma.role.createMany({
    data: [
      { id: 'admin-role-id', name: 'Admin' },
      { id: 'user-role-id', name: 'User' },
    ],
    skipDuplicates: true,
  })
}

main()
  .then(() => {
    console.log('Seed complete')
    process.exit(0)
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
