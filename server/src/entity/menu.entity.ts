import { Column, Entity, OneToMany, ManyToOne, JoinColumn, Index } from 'typeorm';
import { IsOptional } from 'class-validator';
import { Abstract } from './abstract.entity';

@Entity('menu')
export class Menu extends Abstract {
  @Column({
    default: null,
    type: 'longtext',
  })
  menu: string;
}
