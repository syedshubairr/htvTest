import { verify } from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decode = verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({
        message: "Token expired",
      });
    } else {
      console.log(error);
      res.json({
        message: "Authentication failed",
      });
    }
  }
};
export default verifyToken;