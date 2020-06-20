import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../utils/Base.entity';

@Entity('basics')
export class BasicsEntity extends BaseEntity {
  @Column('varchar')
  category: string;
}
