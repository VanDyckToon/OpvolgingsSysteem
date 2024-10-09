import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ormConfig from './typeorm/orm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './rol/rol.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...ormConfig,
        url: configService.get('DATABASE_URL'),
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    RolModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
