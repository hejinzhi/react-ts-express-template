import { NextFunction, Request, Response } from 'express';
import DeptService from '@services/dept.service';
import jwt from 'jsonwebtoken';
import config from 'config';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { QueryDeptProps } from '@/interfaces/users.interface';

class DeptController {
  public deptService = new DeptService();

  public getDepts = async (req: Request, res: Response, next: NextFunction) => {
    const filter: QueryDeptProps = req.query;
    const result = await this.deptService.getDepts(filter);
    res.status(200).send({
      data: {
        rows: result[0],
        total: result[1],
      },
    });
  };

  public insertOrUpdateDept = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const dept = req.body;
    const result = await this.deptService.insertOrUpdateDept(dept);
    res.status(200).send(result);
  };

  public deleteDept = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const query = req.query as any;
    const result = await this.deptService.deleteDept(query.id);
    res.status(200).send(result);
  };
}

export default DeptController;
