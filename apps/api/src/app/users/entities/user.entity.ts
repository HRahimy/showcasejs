import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PhotoEntity } from './photo.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column('text')
  public name: string;

  @Column('text')
  public description: string;

  // Reference for cascade https://stackoverflow.com/questions/54965381/how-to-insert-an-entity-with-onetomany-relation-in-nestjs
  @OneToMany((type) => PhotoEntity, (photo) => photo.user, {cascade: ['insert', 'update', 'remove']})
  public photos: PhotoEntity[];

  constructor(
    id: string,
    name: string,
    description: string,
    photos: PhotoEntity[],
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.photos = photos;
  }
}
