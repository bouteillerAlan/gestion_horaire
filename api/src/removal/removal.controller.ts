import {Body, Param, Controller, Delete, Get, Post, Put, UseGuards} from '@nestjs/common';
import {RemovalService} from './removal.service';
import {RemovalDto} from './removal.dto';
import {RemovalEditDto} from './removal.edit.dto';
import {AuthGuard} from '@nestjs/passport';
import {RolesGuard} from '../security/roles.guard';
import {Roles} from '../security/roles.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('Admin')
@Controller('removal')
export class RemovalController {
  constructor(private readonly removalService: RemovalService) {}

  @Get()
  async getAll() {
    return this.removalService.findAll();
  }

  @Get('month')
  async getMonth() {
    return this.removalService.findMonth();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.removalService.findOne(id);
  }

  @Post()
  async insert(@Body() data: RemovalDto) {
    return this.removalService.insert(data);
  }

  @Put('/:id')
  async update(@Body() data: RemovalEditDto, @Param() id: number) {
    return this.removalService.update(id, data);
  }

  @Delete('/:id')
  async delete(@Param() id: number) {
    return this.removalService.delete(id);
  }
}
