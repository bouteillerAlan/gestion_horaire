import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import { AppService } from './app.service';
import {AppLogInDto} from './app.dto';
import {AuthGuard} from '@nestjs/passport';
import {RolesGuard} from './security/roles.guard';
import {Roles} from './security/roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * hello endpoint just for test
   * @Return {string} a quote
   */
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('User')
  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * login endpoint
   * @Param {AppDto} body {name: string password: string}
   * @Return {any} the jwt or error
   */
  @Post('login')
  logIn(@Body() body: AppLogInDto): Promise<any> {
    return this.appService.logIn(body);
  }
}
