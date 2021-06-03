"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var employeeController_1 = __importDefault(require("../controllers/employeeController"));
var router = express_1.default.Router();
router.get('/', employeeController_1.default.getEmployees);
router.get('/:id', employeeController_1.default.getEmployeeById);
router.post('/', employeeController_1.default.addNewEmployee);
router.put('/:id', employeeController_1.default.updateEmployee);
router.delete('/:id', employeeController_1.default.deleteEmployeeById);
module.exports = router;
