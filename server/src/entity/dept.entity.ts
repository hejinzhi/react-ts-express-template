import { Column, Entity, OneToMany, ManyToOne, JoinColumn, Index } from 'typeorm';
import { IsOptional } from 'class-validator';
import { Abstract } from './abstract.entity';

@Entity('dept')
export class Dept extends Abstract {
  @Column({
    default: '',
  })
  name: string;

  @Column({
    default: '',
  })
  desc: string;
}
