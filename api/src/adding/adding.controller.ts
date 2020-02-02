import {Body, Param, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {AddingService} from './adding.service';
import {AddingDto} from './adding.dto';
import {AddingEditDto} from './adding.edit.dto';

@Controller('adding')
export class AddingController {
  constructor(private readonly addingService: AddingService) {}

  @Get()
  async getAll() {
    return this.addingService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.addingService.findOne(id);
  }

  @Post()
  async insert(@Body() data: AddingDto) {
    return this.addingService.insert(data);
  }

  @Put('/:id')
  async update(@Body() data: AddingEditDto, @Param() id: number) {
    return this.addingService.update(id, data);
  }

  @Delete('/:id')
  async delete(@Param() id: number) {
    return this.addingService.delete(id);
  }
}
