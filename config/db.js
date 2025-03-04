require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");

// Initialisation Sequelize avec PostgreSQL
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    dialect: "postgres",
    logging: false, // Mettre à `true` pour afficher les logs SQL dans la console
  }
);

// Liste des fichiers dans le dossier models
const modelsPath = path.join(__dirname, "../models");
const models = {}; // Objet pour stocker les modèles

fs.readdirSync(modelsPath)
  .filter((file) => file.endsWith(".model.js")) // Charger uniquement les modèles
  .forEach((file) => {
    const model = require(path.join(modelsPath, file))(sequelize, DataTypes);
    models[model.name] = model; // Ajouter le modèle dans l'objet `models`
  });

// Appliquer les associations (si elles existent)
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Attacher les modèles à Sequelize
sequelize.models = models;

// Vérification de connexion
sequelize
  .authenticate()
  .then(() => {
    console.log("✅ Connexion à PostgreSQL réussie !");
    console.log("📌 Modèles chargés :", Object.keys(models)); // Vérifie que les modèles sont bien importés
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion à PostgreSQL :", err);
  });

// Synchronisation des modèles avec la DB
sequelize
  .sync({ force: true, alter: true }) // Mettre `alter: true` en prod pour éviter la perte de données
  .then(() => {
    console.log("✅ Les modèles sont synchronisés avec la base de données.");
  })
  .catch((error) => {
    console.error("❌ Impossible de synchroniser la base de données :", error);
  });

module.exports = { sequelize, models };
