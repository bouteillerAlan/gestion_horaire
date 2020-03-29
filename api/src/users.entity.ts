import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  password: string;

  @Column('text', {nullable: true})
  jwt: string;

  @Column('text')
  role: string;
}
