import { Module } from '@nestjs/common';
import { WeatherDataService } from './weather-data.service';
import { WeatherDataController } from './weather-data.controller';
import { UserModule } from 'src/user/user.module';
import { WeatherDatum } from './entities/weather-datum.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [WeatherDataController],
  providers: [WeatherDataService],
  imports: [TypeOrmModule.forFeature([WeatherDatum]), UserModule],
})
export class WeatherDataModule {}
