import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReqWeatherDatumDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '5d8e7ba6-3840-4088-abc1-f1835b0ab585',
    description: 'apiToken is needed for access to end-point',
  })
  apiToken: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'London',
    description: 'name of the city the weather in which we want to know',
  })
  city: string;

  @IsString()
  @ApiProperty({
    example: 'Ru',
    description:
      'Optional parameter if we want to get result in particular language',
  })
  lang?: string;
}
