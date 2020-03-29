import {Body, Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';
import {AppDto} from './app.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * hello endpoint just for test
   * @Return {string} a quote
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * login endpoint
   * @Param {AppDto} body {name: string password: string}
   * @Return {any} the jwt or error
   */
  @Post('login')
  logIn(@Body() body: AppDto): any {
    return this.appService.logIn(body);
  }
}
