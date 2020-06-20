import { Entity } from 'typeorm';
import { BaseEntity } from '../../utils/Base.entity';

@Entity('verbs')
export class VerbsEntity extends BaseEntity {}
