import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// @Entity()
export class Abstract {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn({
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    nullable: false,
  })
  updatedAt: Date;

  @Column({
    default: '0',
  })
  disabled: string;
}
