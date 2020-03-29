import {IsUUID, IsString} from 'class-validator';

export class UsersDto {
  @IsUUID()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsString()
  password: string;

  @IsString()
  role: string = 'User';
}
