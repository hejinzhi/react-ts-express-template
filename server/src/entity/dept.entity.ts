import { Column, Entity} from 'typeorm';
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
