import { Controller, Post, Body } from '@nestjs/common';
import { WeatherDataService } from './weather-data.service';
import { ReqWeatherDatumDto } from './dto/req-weather-datum.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WeatherDatum } from './entities/weather-datum.entity';

@ApiTags('Weather request')
@Controller('api/weather')
export class WeatherDataController {
  constructor(private readonly weatherDataService: WeatherDataService) {}

  @ApiOperation({
    summary:
      'If apitoken is valid - it shows current tempature in requested city',
  })
  @ApiResponse({ status: 201, type: WeatherDatum })
  @Post()
  getWeather(@Body() req: ReqWeatherDatumDto) {
    return this.weatherDataService.getWeather(req);
  }
}
