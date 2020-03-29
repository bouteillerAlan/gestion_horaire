import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './user.service';
import { UsersController } from './users.controller';
import { Users } from './users.entity';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Users])],
  providers: [UsersService],
  controllers: [UsersController],
})

export class UsersModule {}
