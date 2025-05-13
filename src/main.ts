import sequelize from './config/database';
import User from './models/User';

// Function to test database connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    
    // Sync all models with database
    await sequelize.sync({ force: true });
    console.log('Database synchronized');
    
    // Create a test user
    const newUser = await User.create({
      name: 'John Doe',
      email: 'john.doe@example.com'
    });
    
    console.log('User created:', newUser.toJSON());
    
    // Find all users
    const users = await User.findAll();
    console.log('All users:', JSON.stringify(users, null, 2));
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    // Close the connection
    await sequelize.close();
  }
}

// Run the test
testConnection().catch(err => {
  console.error('Error in test execution:', err);
});

export default testConnection; 