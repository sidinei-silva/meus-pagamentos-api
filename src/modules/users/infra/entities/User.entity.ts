import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '@modules/users/domain/User';

@Entity('users')
export class UserEntity extends User {
  @PrimaryColumn()
  public declare id: string;

  @Column()
  public declare name: string;

  @Column({ unique: true })
  public declare email: string;

  @Column()
  public declare password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    super();
  }
}
