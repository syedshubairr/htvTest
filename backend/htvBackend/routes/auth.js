import { Router } from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
} from "../controllers/AuthController.js";
const AuthRoutes = Router();

AuthRoutes.post("/register", registerUser);
AuthRoutes.post("/login", loginUser);
AuthRoutes.get("/users", getAllUsers);
export default AuthRoutes;
