import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import DeptController from '@/controllers/dept.controller';

class DeptRoute implements Route {
  public path = '/api/dept';
  public router = Router();
  public deptController = new DeptController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.deptController.getDepts);
    this.router.delete(`${this.path}`, authMiddleware, this.deptController.deleteDept);
    this.router.post(`${this.path}`, authMiddleware, this.deptController.insertOrUpdateDept);
  }
}

export default DeptRoute;
