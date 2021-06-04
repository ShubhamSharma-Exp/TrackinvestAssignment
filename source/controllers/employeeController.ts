import { Request, Response, NextFunction } from 'express';
import pool from '../dbconfig/dbconfig';

const NAMESPACE = 'Employ Controller';

const getEmployees = async (req: Request, res: Response, next: NextFunction) => {
    
    pool.query("SELECT * FROM employees ORDER BY empid ASC", (error, result) => {
        if (error) {
            res.send({message:"Bad Request"}).status(400)
        }
        res.send(result.rows).status(200);
    });
};

const getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM employees WHERE empid = $1', [id], (error, result) => {
        if (error) {
            res.send({message:"Bad Request"}).status(400)
        }
        res.send(result.rows).status(200);
    });
};

const getEmployeeByName = async (req: Request, res: Response, next: NextFunction) => {
    
    const name = req.query.q;
    pool.query('SELECT * FROM employees WHERE empname = $1', [name], (error, result) => {
        if (error) {
            res.send({message:"Bad Request"}).status(400)
        }
        res.send(result.rows).status(200);
    });
};


const getEmployeesOfSameDepartment = async (req: Request, res: Response, next: NextFunction) => {

    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM employees WHERE deptid = $1', [id], (error, result) => {
        if (error) {
            res.send({ message: "Bad Request" }).status(400)
        }
        res.send(result.rows).status(200);
    });
};

const addNewEmployee = async (req: Request, res: Response, next: NextFunction) => {

    const { empname, empdob, deptid } = req.body;
    console.log(req.body);
    console.log(empname,empdob,deptid);
    console.log(req.body);
    pool.query('INSERT INTO employees (empname,empdob,deptid) VALUES ($1, $2, $3)',[empname,empdob,deptid], (error, result) => {
        if (error) {
            console.log(error);
            res.send({ message: "Employee not added" }).status(400);   
        }
        else {
            res.send({ message: "Employee added Successfully" }).status(201);
        }
    });

};

const updateEmployee = async (req: Request, res: Response, next: NextFunction) => { 

    const id = parseInt(req.params.id);
    const { empname, empdob, deptid } = req.body;
    pool.query('UPDATE employees SET empname = $1, empdob = $2, deptid = $3 WHERE empid = $4',[empname,empdob,deptid,id], (error, result) => {
        if (error) {
            res.send({ message: "Employee not updated" }).status(400);
        }
        else {
            res.send({ message: "Employee updated Successfully" }).status(201);
        }
    });
};



const deleteEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    
    const id = parseInt(req.params.id);
    const sql = `DELETE FROM employees WHERE empid = ${id}`;
    pool.query(sql, (error, result) => {
        if (error) {
            res.send({ message: "Employee Not Deleted" }).status(400);
        }
    });

    res.send({message:`Employee Deleted with ID : ${id}`}).status(200);
};

export default { getEmployees,getEmployeeById,getEmployeeByName,getEmployeesOfSameDepartment,addNewEmployee,updateEmployee,deleteEmployeeById };