import {IsNumber, IsDate} from 'class-validator';

export class RemovalEditDto {
  @IsNumber()
  readonly idUser: number;

  @IsNumber()
  readonly sum: number;

  @IsDate()
  readonly date: Date;
}
