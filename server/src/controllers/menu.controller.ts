import { NextFunction, Request, Response } from 'express';
import config from 'config';
import { RequestWithUser } from '@/interfaces/auth.interface';
import MenuService from '@/services/menu.service';

class MenuController {
  public menuService = new MenuService();

  public getMenu = async (req: Request, res: Response, next: NextFunction) => {
    const result = await this.menuService.getMenu();
    if (result) {
      res.status(200).send({
        data: result.menu,
      });
    } else {
      res.status(200).send('');
    }
  };

  public setMenu = async (req: Request, res: Response, next: NextFunction) => {
    const m = req.body.menu;
    const result = await this.menuService.setMenu(JSON.stringify(m));
    res.status(200).send(result);
  };
}

export default MenuController;
