import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddingService } from './adding.service';
import { AddingController } from './adding.controller';
import { Adding } from './adding.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Adding])],
  providers: [AddingService],
  controllers: [AddingController],
})
export class AddingModule {}
