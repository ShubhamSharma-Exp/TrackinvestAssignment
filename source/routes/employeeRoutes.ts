import express from 'express';
import controller from '../controllers/employeeController';

const router = express.Router();

router.get('/', controller.getEmployees);
router.get('/api/:id', controller.getEmployeeById);
router.get('/name', controller.getEmployeeByName);
router.get('/dept/:id', controller.getEmployeesOfSameDepartment);
router.post('/', controller.addNewEmployee);
router.put('/:id', controller.updateEmployee);
router.delete('/:id', controller.deleteEmployeeById);

export = router;