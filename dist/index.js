"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("reflect-metadata");
var cors_1 = __importDefault(require("cors"));
var typeorm_1 = require("typeorm");
var user_routes_1 = __importDefault(require("./routes/user.routes"));
var enviroment_1 = __importDefault(require("./enviroment"));
var app = express_1.default();
typeorm_1.createConnection();
var bodyParser = require("body-parser");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
//Cors
app.use(cors_1.default());
//Lectura y parseo del body
app.use(express_1.default.json());
//Routes
app.use(user_routes_1.default);
app.listen(enviroment_1.default.PORT, function () {
    console.log("Escuchando puerto: ", enviroment_1.default.PORT);
});
