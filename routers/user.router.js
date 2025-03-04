const express = require("express");
const userController = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.get("/users", userController.getAllUsers);
userRouter.get("/users/:id", userController.getUserById);
userRouter.post("/auth/register", userController.register);
userRouter.post("/auth/login", userController.login);
