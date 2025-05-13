import { sequelize } from './config/sequelize';

async function runExample() {
  await sequelize.authenticate();
  console.log('Connection to the database has been established successfully.');
  
  await sequelize.sync({ force: true });
  console.log('Database synchronized');

  await sequelize.query('SELECT pg_sleep(5);')

  console.log("Congrats you made it through the timeout")
}

runExample()