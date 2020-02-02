import {Body, Param, Controller, Delete, Get, Post, Put} from '@nestjs/common';
import {CustomersService} from './customers.service';
import {CustomersDto} from './customer.dto';
import {CustomersEditDto} from './customer.edit.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async getAll() {
    return this.customersService.findAll();
  }

  @Get('/:id/:join')
  async getOne(@Param() param: {id: number, join: string}) {
    return this.customersService.findOne(param.id, param.join);
  }

  @Post()
  async insert(@Body() data: CustomersDto) {
    return this.customersService.insert(data);
  }

  @Put('/:id')
  async update(@Body() data: CustomersEditDto, @Param() id: number) {
    return this.customersService.update(id, data);
  }

  @Delete('/:id')
  async delete(@Param() id: number) {
    return this.customersService.delete(id);
  }
}
