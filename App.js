require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Maximum 100 requêtes par IP
  message: "Trop de requêtes, veuillez réessayer plus tard.",
});

// Sécurité de base
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(limiter);
app.use(expressValidator());

// Importer les routes
const userRouter = require("./routers/user.router");
app.use("/api/users", userRouter);

// Middleware global de gestion des erreurs
app.use((err, req, res, next) => {
  console.error("❌ Erreur serveur :", err);
  res.status(500).json({ message: "Erreur interne du serveur" });
});

// Démarrer le serveur
const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
  console.log(`✅ Serveur en ligne : http://localhost:${PORT}`);
});
