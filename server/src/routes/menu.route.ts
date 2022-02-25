import { Router } from 'express';

import Route from '@interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import MenuController from '@/controllers/menu.controller';

class MenuRoute implements Route {
  public path = '/api/menu';
  public router = Router();
  public menuController = new MenuController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authMiddleware, this.menuController.getMenu);
    this.router.post(`${this.path}`, authMiddleware, this.menuController.setMenu);
  }
}

export default MenuRoute;
