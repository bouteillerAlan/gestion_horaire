import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Customers } from './customers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customers])],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
