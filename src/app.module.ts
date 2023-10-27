import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { WeatherDataModule } from './weather-data/weather-data.module';
import { WeatherDatum } from './weather-data/entities/weather-datum.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER,
      entities: [User, WeatherDatum],
      database: process.env.POSTGRES_DB,
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    UserModule,
    WeatherDataModule,
  ],
})
export class AppModule {}
