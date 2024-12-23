import {
  Generated,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Generated('uuid')
  id: string;

  @Column()
  text: string;

  //TODO: make linking with User entity
  @Column()
  author_id: string
}
