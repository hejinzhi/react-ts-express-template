import { NextFunction, Request, Response } from 'express';
import userService from '@services/users.service';
import jwt from 'jsonwebtoken';
import config from 'config';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { QueryUserProps } from '@/interfaces/users.interface';
const jwtSecretKey: string = config.get('jwtSecretKey');

class UsersController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const filter: QueryUserProps = req.query;
    const result = await this.userService.getUsers(filter);
    res.status(200).send({
      data: {
        rows: result[0],
        total: result[1],
      },
    });
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const body: { username: string; password: string } = req.body;
    const token = await this.userService.login(body.username, body.password);
    res.status(200).send(token);
  };

  public userInfo = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.user;
    res.status(200).send(user);
  };

  public updateUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const user = req.body;
    const result = await this.userService.updateUser(user);
    res.status(200).send(result);
  };
}

export default UsersController;
