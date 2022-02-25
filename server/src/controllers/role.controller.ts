import { QueryRoleProps } from './../interfaces/index.interface';
import { NextFunction, Request, Response } from 'express';
import config from 'config';
import { RequestWithUser } from '@/interfaces/auth.interface';
import MenuService from '@/services/menu.service';
import RoleService from '@/services/role.service';

class RoleController {
  public roleService = new RoleService();

  public getRoles = async (req: Request, res: Response, next: NextFunction) => {
    const filter: QueryRoleProps = req.query;
    const result = await this.roleService.getRole(filter);
    res.status(200).send({
      data: {
        rows: result[0],
        total: result[1],
      },
    });
  };

  public addRole = async (req: Request, res: Response, next: NextFunction) => {
    const m = req.body;
    const result = await this.roleService.addRole(m);
    res.status(200).send(result);
  };

  public deleteRole = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.query.id;
    if (id) {
      const result = await this.roleService.deleteRole(+id);
      res.status(200).send(result);
    }
    res.status(200).send('');
  };

  public updateRole = async (req: Request, res: Response, next: NextFunction) => {
    const m = req.body;
    const result = await this.roleService.addRole(m);
    res.status(200).send(result);
  };
}

export default RoleController;
