import express from 'express';
import controller from '../controllers/departmentController';

const router = express.Router();

router.get('/', controller.getDepartments);
router.get('/api/:id', controller.getDepartmentById);
router.get('/name',controller.getDepartmentByName)
router.post('/', controller.addNewDepartment);
router.put('/:id', controller.updateDepartment);
router.delete('/:id', controller.deleteDepartmentById);

export = router;
