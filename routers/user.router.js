var express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");
const { body, validationResult } = require("express-validator");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// GET /users : List all users
router.get("/users", userController.listAllUsers);

// POST /users : Create a new user
router.post(
  "/signUp",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.status(201).json({ message: "Utilisateur valide" });
  },
  userController.signUp
);

router.post("/refresh", refresh, userController.getRefreshToken);

module.exports = router;
