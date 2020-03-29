import {Body, Param, Controller, Delete, Get, Post, Put, UseGuards} from '@nestjs/common';
import {UsersService} from './user.service';
import {UsersDto} from './user.dto';
import {UsersEditDto} from './user.edit.dto';
import {AuthGuard} from '@nestjs/passport';
import {RolesGuard} from '../security/roles.guard';
import {Roles} from '../security/roles.decorator';

// todo mep the id by the jwt and not by the url param #4cmvfa
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin')
  @Get('/:id')
  async getOne(@Param() param: {id: number}) {
    return this.usersService.findOne(param.id);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin')
  @Post()
  async insert(@Body() data: UsersDto) {
    return this.usersService.insert(data);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin')
  @Put('/:id')
  async update(@Body() data: UsersEditDto, @Param() id: number) {
    return this.usersService.update(id, data);
  }

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('Admin')
  @Delete('/:id')
  async delete(@Param() id: number) {
    return this.usersService.delete(id);
  }
}
