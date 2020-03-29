import {IsString} from 'class-validator';

export class AppLogInDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;
}
