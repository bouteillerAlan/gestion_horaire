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
import {AddingModule} from './adding/adding.module';
import {RemovalModule} from './removal/removal.module';
import {Users} from './users/users.entity';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './security/jwt.strategy';
import {UsersModule} from './users/users.module';

@Module({
  imports: [
    ConfigModule,
    // db
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (env: ConfigService) => ({
        type: 'mysql' as 'mysql',
        host: env.get('db_uri'),
        port: Number(env.get('db_port')),
        username: env.get('db_user'),
        password: env.get('db_pass'),
        database: env.get('db_name'),
        entities: [Customers, Removal, Adding, Users],
        synchronize: true,
      }),
    }),
    // Authentication
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (env: ConfigService) => ({
        secret: env.get('secret'),
        signOptions: { expiresIn: '3600s' },
      }),
    }),
    // for the service
    TypeOrmModule.forFeature([Users]),
    // other
    CustomersModule,
    AddingModule,
    RemovalModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})

export class AppModule {}
