"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var enviroment_1 = __importDefault(require("../enviroment"));
var validarJWT = function (req, res, next) {
    var token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la petición",
        });
    }
    try {
        var id = jsonwebtoken_1.default.verify(token, enviroment_1.default.SECRET_JWT_SEED).id;
        req.userId = id;
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token no valido",
        });
    }
    next();
    //   const payload = jwt.verify(
    //     token,
    //     enviroment.SECRET_JWT_SEED,
    //     (err, decoded) => {
    //       if (err) {
    //         return res.status(401).json({
    //           ok: false,
    //           err: {
    //             message: "token no valido",
    //           },
    //         });
    //       }
    //       console.log(payload);
    //       next();
    //     }
    //   );
};
exports.default = validarJWT;
