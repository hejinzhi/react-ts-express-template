import { Role } from './../entity/role.entity';
import { getRepository, Like } from 'typeorm';
import { CreateRoleDto } from '@/dtos/index.dto';
import { QueryRoleProps } from '@/interfaces/index.interface';

class RoleService {
  public role = Role;

  public async getRole(filter: QueryRoleProps) {
    const pageSize = +filter.pageSize || 10;
    const current = +filter.current || 1;
    const roleRepository = getRepository(this.role);
    const whereClause: any = {
      disabled: '0',
    };
    if (filter.name) {
      whereClause.name = Like(`%${filter.name}%`);
    }
    if (filter.desc) {
      whereClause.desc = Like(`%${filter.desc}%`);
    }

    const role = await roleRepository.findAndCount({
      where: whereClause,
      take: pageSize,
      skip: pageSize * (current - 1),
    });
    return role;
  }

  public async addRole(role: CreateRoleDto) {
    const roleRepository = getRepository(this.role);
    const roleRes = await roleRepository.save(role);
    return roleRes;
  }

  public async deleteRole(id: number) {
    const roleRepository = getRepository(this.role);
    return await roleRepository.delete({
      id,
    });
  }
}

export default RoleService;
