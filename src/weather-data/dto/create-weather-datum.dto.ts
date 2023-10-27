import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateWeatherDatumDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsNumber()
  @IsNotEmpty()
  action_time: number;

  @IsNumber()
  @IsNotEmpty()
  request_result: number;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  temp_c: number | null;
}
