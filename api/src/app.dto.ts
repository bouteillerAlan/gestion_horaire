import {IsString} from 'class-validator';

export class AppDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;
}
