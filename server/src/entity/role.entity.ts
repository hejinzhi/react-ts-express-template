import { Column, Entity, OneToMany, ManyToOne, JoinColumn, Index } from 'typeorm';
import { IsOptional } from 'class-validator';
import { Abstract } from './abstract.entity';

@Entity('role')
export class Role extends Abstract {
  @Column({
    default: '',
  })
  name: string;

  @Column({
    default: '',
  })
  desc: string;

  @Column({
    default: null,
    type: 'longtext',
  })
  permissions: string;
}
