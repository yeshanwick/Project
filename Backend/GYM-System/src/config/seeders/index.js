const Sequelize = require("sequelize");
const db = require("../DatabaseConnection");

// Load the seeders
const seeders = [
  require("./20230712120000-create-user"),
  // Add more seeders if needed
];

// Run the seeders
const runSeeders = async () => {
  for (const seeder of seeders) {
    try {
      await seeder.up(db.getQueryInterface(), Sequelize);
      console.log(`Seeder executed successfully.`);
    } catch (err) {
      console.error(`Error executing seeder:`, err);
    }
  }
};

module.exports = runSeeders;
