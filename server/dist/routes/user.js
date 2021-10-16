"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import {UserModel} from '../database/Schema';
var CRUD_1 = require("../controllers/user/CRUD");
var Auth_1 = require("../middlewares/Auth");
var Other_1 = require("../controllers/user/Other");
var router = express_1.default.Router();
router.get('/', CRUD_1.GetUsers);
router.post('/create', CRUD_1.AddUser);
router.delete('/delete', CRUD_1.DeleteUser);
router.post('/singin', CRUD_1.SingIn);
router.put('/update', CRUD_1.UpdateUser);
router.get('/:name', CRUD_1.GetUser);
router.post('/follow', Auth_1.Auth, Other_1.UserFollow);
router.get('/verify/:id', function (req, res) {
    res.send('Birds home page');
});
exports.default = router;
