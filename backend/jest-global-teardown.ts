import { execSync } from 'child_process';

module.exports = async () => {
  await execSync('npx prisma migrate reset --schema=prisma/schema.test.prisma --force');
};