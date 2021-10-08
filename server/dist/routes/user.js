"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import {UserModel} from '../database/Schema';
var CRUD_1 = require("../controllers/user/CRUD");
var router = express_1.default.Router();
// middleware that is specific to this router
// router.use(function timeLog (req, res, next) {
//   console.log('Time: ', Date.now())
//   next()
// })
// console.log('User');
router.get('/', function (req, res) {
    CRUD_1.GetUsers(req, res);
});
router.post('/create', CRUD_1.AddUser);
router.delete('/delete', function (req, res) {
    CRUD_1.DeleteUser(req, res);
});
router.post('/singin', function (req, res) {
    CRUD_1.SingIn(req, res);
});
router.put('/update', function (req, res) {
    CRUD_1.UpdateUser(req, res);
});
router.get('/verify/:id', function (req, res) {
    res.send('Birds home page');
});
router.get('/:name', function (req, res) {
    CRUD_1.GetUser(req, res);
});
exports.default = router;
