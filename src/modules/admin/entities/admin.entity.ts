import { Column, Entity } from 'typeorm';
import { AbstractEntity } from 'src/common/database/abstract-entity.database';

@Entity('admin')
export class Admin extends AbstractEntity {
  @Column('varchar')
  login: string;

  @Column('varchar')
  password: string;
}
