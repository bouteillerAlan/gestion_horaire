import {IsOptional, IsString} from 'class-validator';

export class UsersEditDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly password: string;
}
