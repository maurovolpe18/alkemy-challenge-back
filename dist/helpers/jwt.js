"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var enviroment_1 = __importDefault(require("../enviroment"));
var generarJWT = function (id, user) {
    return new Promise(function (resolve, reject) {
        var payload = { id: id, user: user };
        jsonwebtoken_1.default.sign(payload, enviroment_1.default.SECRET_JWT_SEED, {
            expiresIn: "2h",
        }, function (err, token) {
            if (err) {
                console.log(err);
                reject("No se pudo general el token");
            }
            resolve(token);
            console.log(id, user);
        });
    });
};
exports.default = generarJWT;
