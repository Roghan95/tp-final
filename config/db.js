require("dotenv").config();
const { Sequelize } = require("sequelize");

// Initialisation Sequelize avec PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    dialect: "postgres",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

sequelize
  .sync({ force: false, alter: true })
  .then(() => {
    console.log("Les modèles ont été synchronisés avec la base de données.");
  })
  .catch((error) => {
    console.error("Impossible de se connecter à la base de données:", error);
  });

module.exports = sequelize;
