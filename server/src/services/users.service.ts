import { Role } from './../entity/role.entity';
import { getRepository, Like, UpdateResult } from 'typeorm';
import { QueryUserProps, UpdateUserProps, User } from '@interfaces/users.interface';
import { Users } from '@/entity/users.entity';
import jwt from 'jsonwebtoken';
import config from 'config';
const jwtSecretKey: string = config.get('jwtSecretKey');

class UserService {
  public users = Users;
  public roles = Role;

  public async getUsers(filter: QueryUserProps) {
    const pageSize = +filter.pageSize || 10;
    const current = +filter.current || 1;
    const usersRepository = getRepository(this.users);
    const whereClause: any = {
      disabled: '0',
    };
    if (filter.name) {
      whereClause.name = Like(`%${filter.name}%`);
    }
    if (filter.role) {
      whereClause.role = filter.role;
    }
    if (filter.tel) {
      whereClause.tel = Like(`%${filter.tel}%`);
    }
    const users = await usersRepository.findAndCount({
      select: ['id', 'name', 'tel', 'roleId', 'deptId'],
      where: whereClause,
      take: pageSize,
      skip: pageSize * (current - 1),
    });
    const u = users[0];
    const count = users[1];

    // const rolesRepository = getRepository(this.roles);
    // const roles = await rolesRepository.find({
    //   disabled: '0',
    // });
    // u.forEach(v => {
    //   const index = roles.findIndex(r => r.id === +v.roleId);
    //   if (index > -1) {
    //     v.roleDesc = roles[index].name;
    //   }
    // });
    return [u, count];
  }

  public async login(tel: string, password: string) {
    const usersRepository = getRepository(this.users);
    const user = await usersRepository.findOne({
      disabled: '0',
      tel,
      password,
    });
    if (user) {
      // return user;
      const token = this.genToken({
        id: user.id,
        tel: user.tel,
        name: user.name,
      });
      return {
        token,
      };
    } else {
      return {
        msg: '账号或密码错误',
      };
    }
  }

  public genToken(body: any) {
    return jwt.sign(body, jwtSecretKey, { expiresIn: '12h' });
  }

  public async updateUser(body: User) {
    const usersRepository = getRepository(this.users);
    const user = await usersRepository.save(body);
    return user;
  }
}

export default UserService;
