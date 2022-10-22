import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  name: string;

  @Column('varchar')
  description: string;

  @Column()
  filename: string;

  @Column('float')
  views: number;

  @Column()
  isPublished: boolean;
}
