import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RemovalService } from './removal.service';
import { RemovalController } from './removal.controller';
import { Removal } from './removal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Removal])],
  providers: [RemovalService],
  controllers: [RemovalController],
})
export class RemovalModule {}
