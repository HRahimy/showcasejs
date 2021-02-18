import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({name: 'photo'})
export class PhotoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column('text', {nullable: true})
  description: string;

  @Column({nullable: true, type: 'text'})
  filename: string;

  @Column('int', {nullable: true})
  views: number;

  @Column({name: 'is_published', nullable: true, type: 'boolean'})
  isPublished: boolean;

  @ManyToOne(type => UserEntity, user => user.photos)
  user: UserEntity;

  constructor(name: string) {
    this.name = name;
  }
}
