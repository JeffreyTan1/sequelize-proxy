import User from './models/User';
import { sequelize } from './config/sequelize';

const TEST_BULK_CREATE_COUNT = 1000000;

async function runExample() {
  await sequelize.authenticate();
  console.log('Connection to the database has been established successfully.');
  
  await sequelize.sync({ force: true });
  console.log('Database synchronized');

  await User.destroy({ where: {} });
  console.log('All users deleted');

  await User.bulkCreate(Array.from({ length: TEST_BULK_CREATE_COUNT }, (_, i) => ({
    name: `John Doe ${i}`,
    email: `john.doe${i}@example.com`
  })));
  console.log(`Created ${TEST_BULK_CREATE_COUNT} users`);
  
  const users = await User.findAll();
  console.log('All users:', JSON.stringify(users, null, 2));
}

runExample()