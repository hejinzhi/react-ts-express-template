import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import Route from '@interfaces/routes.interface';

class IndexRoute implements Route {
  public path = '/api';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // this.router.get(`${this.path}/platform/test`, this.indexController.customerServiceSendTxt);
    // this.router.get(`${this.path}/platform/test`, this.indexController.testFun);
    // this.router.get(`${this.path}/platform/test`, this.indexController.getTicket);
    // TODO 记得要做权限认证
    // this.router.get(`${this.path}/platform/auth`, this.indexController.getAuthUrl);
  }
}

export default IndexRoute;
