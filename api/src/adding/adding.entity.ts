import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Adding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  idUser: number;

  @Column()
  sum: number;

  @Column()
  date: Date;
}
