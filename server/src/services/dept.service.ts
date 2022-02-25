import { getRepository, Like, UpdateResult } from 'typeorm';
import { QueryDeptProps, QueryUserProps, UpdateUserProps, User } from '@interfaces/users.interface';
import { Dept } from '@/entity/dept.entity';
import config from 'config';
import { DeptProps } from '@/interfaces/index.interface';

class DeptService {
  public dept = Dept;

  public async getDepts(filter: QueryDeptProps) {
    const pageSize = +filter.pageSize || 10;
    const current = +filter.current || 1;
    const deptRepository = getRepository(this.dept);
    const whereClause: any = {
      disabled: '0',
    };
    if (filter.name) {
      whereClause.name = Like(`%${filter.name}%`);
    }
    if (filter.desc) {
      whereClause.desc = filter.desc;
    }

    const depts = await deptRepository.findAndCount({
      select: ['id', 'name', 'desc'],
      where: whereClause,
      take: pageSize,
      skip: pageSize * (current - 1),
    });
    const u = depts[0];
    const count = depts[1];
    return [u, count];
  }

  public async insertOrUpdateDept(body: DeptProps) {
    const deptRepository = getRepository(this.dept);
    const dept = await deptRepository.save(body);
    return dept;
  }

  public async deleteDept(id: number) {
    const deptRepository = getRepository(this.dept);
    const dept = await deptRepository.update(
      {
        id,
      },
      {
        disabled: '1',
      },
    );
    return dept;
  }
}

export default DeptService;
