import { Router } from 'express';
import Route from '@interfaces/routes.interface';
import RoleController from '@/controllers/role.controller';

class RoleRoute implements Route {
  public path = '/api/role';
  public router = Router();
  public roleController = new RoleController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.roleController.getRoles);
    this.router.post(`${this.path}`, this.roleController.addRole);
    this.router.delete(`${this.path}`, this.roleController.deleteRole);
    this.router.put(`${this.path}`, this.roleController.updateRole);
  }
}

export default RoleRoute;
