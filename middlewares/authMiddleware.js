const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("Authorization header missing");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Token missing");
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.auth = { email: decodedToken.sub, userId: decodedToken.userId };

    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: error.message || "Requête non authentifiée" });
  }
};

module.exports = auth;
