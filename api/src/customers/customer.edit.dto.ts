import {IsOptional, IsString} from 'class-validator';

export class CustomersEditDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;
}
