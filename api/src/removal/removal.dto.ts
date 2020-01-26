import {IsUUID, IsNumber, IsDate} from 'class-validator';

export class RemovalDto {
  @IsUUID()
  readonly id: number;

  @IsNumber()
  readonly idUser: number;

  @IsNumber()
  readonly sum: number;

  @IsDate()
  readonly date: Date;
}
