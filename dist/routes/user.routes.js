"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var operation_controller_1 = require("../controllers/operation.controller");
var router = express_1.Router();
var user_controller_1 = require("../controllers/user.controller");
var validar_jwt_1 = __importDefault(require("../middlewares/validar-jwt"));
router.get("/api/user", validar_jwt_1.default, user_controller_1.getUsers);
router.post("/api/user/new", user_controller_1.createUsers);
router.delete("/api/user/:id", user_controller_1.deleteUser);
//Login
router.post("/api/login", user_controller_1.loginUser);
// router.get("/renew", validarJWT, revalidarToken);
//Operation
router.get("/api/operation", validar_jwt_1.default, operation_controller_1.getOperation);
router.post("/api/operation/new", validar_jwt_1.default, operation_controller_1.createOperation);
router.put("/api/operation/:id", validar_jwt_1.default, operation_controller_1.updateOperation);
router.delete("/api/operation/:id", validar_jwt_1.default, operation_controller_1.deleteOperation);
//Renew JWT
router.get("/api/renew", validar_jwt_1.default, user_controller_1.revalidarToken);
exports.default = router;
