import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import Route from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';

class UsersRoute implements Route {
  public path = '/api/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, this.usersController.login);
    this.router.get(`${this.path}/userinfo`, authMiddleware, this.usersController.userInfo);
    this.router.get(`${this.path}`, authMiddleware, this.usersController.getUsers);
    this.router.put(`${this.path}`, authMiddleware, this.usersController.updateUser);
    this.router.post(`${this.path}`, authMiddleware, this.usersController.updateUser);
  }
}

export default UsersRoute;
