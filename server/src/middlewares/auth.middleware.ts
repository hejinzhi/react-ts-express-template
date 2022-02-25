import { Role } from './../entity/role.entity';
import config from 'config';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { Users } from '@/entity/users.entity';
import HttpException from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.header('Authorization').split('bearer ')[1] || null;

    if (Authorization) {
      const secretKey: string = config.get('jwtSecretKey');
      const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse.id;

      const userRepository = getRepository(Users);
      const findUser = await userRepository.findOne({ id: userId }, { select: ['id', 'tel', 'name', 'roleId'] });

      if (findUser) {
        const roleRepository = getRepository(Role);
        const role = await roleRepository.findOne({
          id: findUser.roleId,
        });
        if (role) {
          findUser.permissions = role.permissions;
        }
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
