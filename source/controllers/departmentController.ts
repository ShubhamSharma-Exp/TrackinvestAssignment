import { Request, Response, NextFunction } from 'express';
import pool from '../dbconfig/dbconfig';

const NAMESPACE = 'Department Controller';

const getDepartments = async (req: Request, res: Response, next: NextFunction) => {

    pool.query("SELECT * FROM department ORDER BY deptid ASC", (error, result) => {
        if (error) {
            res.send({message:"Bad Request"}).status(400)
        }
        res.send(result.rows).status(200);
    });

};

const getDepartmentById = async (req: Request, res: Response, next: NextFunction) => {

    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM department WHERE deptid = $1', [id], (error, result) => {
        if (error) {
            res.send({message:"Bad Request"}).status(400)
        }
        res.send(result.rows).status(200);
    });
};

const getDepartmentByName = async (req: Request, res: Response, next: NextFunction) => {

    const name = req.query.q;
    pool.query('SELECT * FROM department WHERE deptname = $1', [name], (error, result) => {
        if (error) {
            res.send({message:"Bad Request"}).status(400)
        }
        res.send(result.rows).status(200);
    });
};

const addNewDepartment = async (req: Request, res: Response, next: NextFunction) => {

    const { deptname, deptlocation } = req.body;
    pool.query('INSERT INTO department (deptname,deptlocation) VALUES ($1,$2)',[deptname,deptlocation], (error, result) => {
        if (error) {
            res.send({ message: "Department not added" }).status(400);
        }
        else {
            res.send({ message: "Department added Successfully" }).status(201);
        }
    });

};

const updateDepartment = async (req: Request, res: Response, next: NextFunction) => {

    const id = parseInt(req.params.id);
    const { deptname, deptlocation } = req.body;
    pool.query('UPDATE department SET deptname = $1, deptlocation = $2 WHERE deptid = $3',[deptname,deptlocation,id], (error, result) => {
        if (error) {
            res.send({ message: "Department not updated" }).status(400);
        }
        else {
            res.send({ message: "Department updated Successfully" }).status(201);
        }
    });

};

const deleteDepartmentById = async (req: Request, res: Response, next: NextFunction) => {

    const id = parseInt(req.params.id);
    pool.query('DELETE FROM department WHERE deptid = $1',[id], (error, result) => {
        if (error) {
            res.send({ message: "Department Not Deleted" }).status(400);
        }
    });
    res.send({message:`Department Deleted with ID : ${id}`}).status(200);

};

export default { getDepartments,getDepartmentById,getDepartmentByName,addNewDepartment,updateDepartment,deleteDepartmentById };