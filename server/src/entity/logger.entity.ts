import { Column, Entity} from 'typeorm';
import { Abstract } from './abstract.entity';

@Entity('logger')
export class Logger extends Abstract {
  @Column({
    default: '',
  })
  url: string;

  @Column({
    default: '',
  })
  method: string;

  @Column({
    default: '',
  })
  params: string;

  @Column({
    default: '',
  })
  body: string;

  @Column({
    default: '',
  })
  ip: string;

  @Column({
    default: 200,
  })
  status: number;

  @Column({
    default: '',
  })
  message: string;
}
