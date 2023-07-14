import { Router } from "express";
import {
  registerUser,
  loginUser,
  refreshToken,
  getAllUsers
} from "../controllers/AuthController.js";
const AuthRoutes = Router();

AuthRoutes.post("/register", registerUser);
AuthRoutes.post("/login", loginUser);
AuthRoutes.post("/refreshtoken", refreshToken);
AuthRoutes.get("/", getAllUsers)
export default AuthRoutes;
