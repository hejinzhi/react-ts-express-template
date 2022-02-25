import { Column, Entity, OneToMany, ManyToOne, JoinColumn, Index } from 'typeorm';
import { IsOptional } from 'class-validator';
import { Abstract } from './abstract.entity';

@Entity('users')
export class Users extends Abstract {
  @Column({
    default: '',
  })
  name: string;

  @Column({
    default: '',
  })
  password: string;

  @Column({
    default: '',
  })
  tel: string;

  @Column({
    default: null,
  })
  roleId: number;

  @Column({
    default: null,
  })
  deptId: number;

  permissions?: string;
}
