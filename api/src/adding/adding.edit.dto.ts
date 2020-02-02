import {IsNumber, IsDate} from 'class-validator';

export class AddingEditDto {
  @IsNumber()
  readonly idUser: number;

  @IsNumber()
  readonly sum: number;

  @IsDate()
  readonly date: Date;
}
