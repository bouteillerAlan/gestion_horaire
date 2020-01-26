import {IsUUID, IsString} from 'class-validator';

export class CustomersDto {
  @IsUUID()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;
}
