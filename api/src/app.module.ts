import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {ConfigModule} from './config/config.module';
import {ConfigService} from './config/config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (env: ConfigService) => ({
        uri: `mongodb://${env.get('db_user')}:${env.get('db_pass')}@${env.get('db_uri')}:${env.get('db_port')}/${env.get('db_name')}`,
        useNewUrlParser: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
