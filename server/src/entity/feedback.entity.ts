import { Column, Entity} from 'typeorm';
import { Abstract } from './abstract.entity';

@Entity('feedback')
export class Feedback extends Abstract {
  @Column({
    default: '',
  })
  name: string;

  @Column({
    default: '',
  })
  desc: string;
}
