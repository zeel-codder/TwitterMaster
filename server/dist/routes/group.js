"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var CRUD_1 = require("../controllers/group/CRUD");
var Auth_1 = require("../middlewares/Auth");
var router = express_1.default.Router();
router.get('/all/:length', Auth_1.Auth, CRUD_1.GetGroups);
router.get('/allgroups', Auth_1.Auth, CRUD_1.GetGroupsAll);
router.post('/create', Auth_1.Auth, CRUD_1.AddGroup);
router.delete('/delete', Auth_1.Auth, CRUD_1.DeleteGroup);
router.put('/update', Auth_1.Auth, CRUD_1.UpdateGroup);
router.get('/:name', Auth_1.Auth, CRUD_1.GetGroup);
exports.default = router;
