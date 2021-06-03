"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var departmentController_1 = __importDefault(require("../controllers/departmentController"));
var router = express_1.default.Router();
router.get('/', departmentController_1.default.getDepartments);
router.get('/:id', departmentController_1.default.getDepartmentById);
router.post('/', departmentController_1.default.addNewDepartment);
router.put('/:id', departmentController_1.default.updateDepartment);
router.delete('/:id', departmentController_1.default.deleteDepartmentById);
module.exports = router;
