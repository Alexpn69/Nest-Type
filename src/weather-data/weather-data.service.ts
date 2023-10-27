import { UserService } from 'src/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateWeatherDatumDto } from './dto/create-weather-datum.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WeatherDatum } from './entities/weather-datum.entity';
import { Repository } from 'typeorm';
import { ReqWeatherDatumDto } from './dto/req-weather-datum.dto';
import * as dotenv from 'dotenv';
dotenv.config();
@Injectable()
export class WeatherDataService {
  constructor(
    @InjectRepository(WeatherDatum)
    private readonly weatherDatumRepository: Repository<WeatherDatum>,
    private userService: UserService,
  ) {}

  createWeatherDatum(
    weatherDatum: CreateWeatherDatumDto,
  ): Promise<WeatherDatum> {
    const newRecord = this.weatherDatumRepository.create(weatherDatum);
    return this.weatherDatumRepository.save(newRecord);
  }

  /*я понял схему работы описанной в ТЗ так - что мы сначала авторизуем юзера
и выслаем ему токен на клиент, а в последствии с клиента нам приходит
запрос только с токеном. Соот-но я не стал в рамках тестового писать 
каких-то сложных схем по валидации и харнению апи токена - 
при каждом запросе на этот энд-пойнт мы просто  имщем юзера в нашей БД
с подобным токеном - если юзер есть, значит токен валиден, и наоборот.

PS
Изначально я хотел сделать auth через jwt и в последствии 
принимать только запросы с валидным jwt в заголовках.
*/

  async getWeather(req: ReqWeatherDatumDto) {
    const user = await this.userService.getUserByProperty(
      'apiToken',
      req.apiToken,
    );
    if (!user) {
      throw new UnauthorizedException({ message: 'Bad creds' });
    }
    const response = await fetch(`
    http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY_WEATHER}&q=${req.city}&lang=${req.lang}
    `);
    const weatherData = await response.json();

    const newRecord = {
      user_id: user.id,
      action_time: Math.floor(Date.now() / 1000),
      request_result: response.status,
      temp_c: response.status === 200 ? weatherData.current.temp_c : null,
    };
    return this.createWeatherDatum(newRecord);
  }
}
