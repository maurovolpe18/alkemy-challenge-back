"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.deleteUser = exports.createUsers = exports.getUsers = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.status(200).json({
                        ok: true,
                        users: users,
                    })];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                return [2 /*return*/, res.status(500).json({
                        ok: false,
                        err: err_1,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUsers = getUsers;
var createUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, user, userFind, newUser, results, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                user = body.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({ user: user })];
            case 2:
                userFind = _a.sent();
                if (userFind) {
                    return [2 /*return*/, res.json({
                            ok: false,
                            err: {
                                message: "El usuario ya existe",
                            },
                        })];
                }
                newUser = typeorm_1.getRepository(User_1.User).create(body);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).save(newUser)];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json({
                        ok: true,
                        results: results,
                    })];
            case 4:
                err_2 = _a.sent();
                console.log(err_2);
                return [2 /*return*/, res.json({
                        ok: false,
                        err: err_2,
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createUsers = createUsers;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne(userId)];
            case 2:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.status(404).json({
                            ok: false,
                            err: {
                                message: "User doesn't exist",
                            },
                        })];
                }
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).delete(userId)];
            case 3:
                _a.sent();
                return [2 /*return*/, res.json({
                        ok: true,
                        message: "user has remove",
                    })];
            case 4:
                err_3 = _a.sent();
                console.log(err_3);
                return [2 /*return*/, res.json({
                        ok: false,
                        err: err_3,
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = deleteUser;
// Login User
var loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, user, password, userFind, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, user = _a.user, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, typeorm_1.getRepository(User_1.User).findOne({ user: user })];
            case 2:
                userFind = _b.sent();
                if (!userFind) {
                    return [2 /*return*/, res.status(400).json({
                            ok: false,
                            msg: "El usuario no existe con ese mail",
                        })];
                }
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.loginUser = loginUser;
