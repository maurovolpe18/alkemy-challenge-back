import { Router } from "express";
import {
  createOperation,
  deleteOperation,
  getOperation,
  updateOperation,
} from "../controllers/operation.controller";
const router = Router();
import {
  createUsers,
  deleteUser,
  getUsers,
  loginUser,
  revalidarToken,
} from "../controllers/user.controller";
import validarJWT from "../middlewares/validar-jwt";

router.get("/api/user", validarJWT, getUsers);
router.post("/api/user/new", createUsers);
router.delete("/api/user/:id", deleteUser);

//Login
router.post("/api/login", loginUser);
// router.get("/renew", validarJWT, revalidarToken);

//Operation

router.get("/api/operation", validarJWT, getOperation);
router.post("/api/operation/new", validarJWT, createOperation);
router.put("/api/operation/:id", validarJWT, updateOperation);
router.delete("/api/operation/:id", validarJWT, deleteOperation);

//Renew JWT

router.get("/api/renew", validarJWT, revalidarToken);
export default router;
