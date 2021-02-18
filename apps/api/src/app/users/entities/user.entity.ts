import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PhotoEntity } from './photo.entity';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  // Reference for column types to database compatibility:
  // https://github.com/typeorm/typeorm/blob/master/src/driver/types/ColumnTypes.ts
  @Column('text')
  public name: string;

  @Column('text')
  public description: string;

  // Reference for cascade:
  // https://stackoverflow.com/questions/54965381/how-to-insert-an-entity-with-onetomany-relation-in-nestjs
  @OneToMany((type) => PhotoEntity, (photo) => photo.user, {
    cascade: ['insert', 'update', 'remove'],
  })
  public photos: PhotoEntity[];

  // Reference for string array type column:
  // https://github.com/typeorm/typeorm/blob/fde9f0772eef69836ff4d85816cfe4fd6f7028b4/test/functional/database-schema/column-types/postgres/entity/Post.ts#L242
  @Column('text', { array: true })
  programmingLanguages: string[];

  constructor(
    id: string,
    name: string,
    description: string,
    photos: PhotoEntity[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.photos = photos;
  }
}
