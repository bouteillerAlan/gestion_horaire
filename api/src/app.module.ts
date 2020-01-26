import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ConfigModule} from './config/config.module';
import {ConfigService} from './config/config.service';
import {Customers} from './customers/customers.entity';
import {Removal} from './removal/removal.entity';
import {Adding} from './adding/adding.entity';
import {CustomersModule} from './customers/customers.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (env: ConfigService) => ({
        type: 'mysql' as 'mysql',
        host: env.get('db_uri'),
        port: Number(env.get('db_port')),
        username: env.get('db_user'),
        password: env.get('db_pass'),
        database: env.get('db_name'),
        entities: [Customers, Removal, Adding],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CustomersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
