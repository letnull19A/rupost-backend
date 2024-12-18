import {
  Generated,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  password: string;

  @Column({ default: '' })
  nickname: string;
}
