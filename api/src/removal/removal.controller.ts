import {Body, Param, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {RemovalService} from './removal.service';
import {RemovalDto} from './removal.dto';
import {RemovalEditDto} from './removal.edit.dto';

@Controller('removal')
export class RemovalController {
  constructor(private readonly removalService: RemovalService) {}

  @Get()
  async getAll() {
    return this.removalService.findAll();
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
