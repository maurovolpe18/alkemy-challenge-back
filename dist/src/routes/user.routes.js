"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
var user_controller_1 = require("../controllers/user.controller");
router.get("/user", user_controller_1.getUsers);
router.post("/user", user_controller_1.createUsers);
router.delete("/user/:id", user_controller_1.deleteUser);
exports.default = router;
