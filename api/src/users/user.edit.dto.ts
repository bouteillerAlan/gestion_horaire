import {IsOptional, IsString} from 'class-validator';

export class UsersEditDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  password: string;
}
