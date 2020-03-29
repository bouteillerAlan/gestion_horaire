import {IsUUID, IsString} from 'class-validator';

export class UsersDto {
  @IsUUID()
  readonly id: number;

  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly role: 'User';
}
