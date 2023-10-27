import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('weather')
export class WeatherDatum {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  @ApiProperty({
    example: 3,
    description: 'Id of user who sends the request',
  })
  user_id: number;

  @Column({ type: 'integer' })
  @ApiProperty({
    example: 16494949,
    description: 'Timestamp of request in unix seconds',
  })
  action_time: number;

  @Column({ type: 'integer' })
  @ApiProperty({
    example: 200,
    description: 'Response status',
  })
  request_result: number;

  @Column({ type: 'float', nullable: true })
  @ApiProperty({
    example: 20.3,
    description:
      'Temprature in requested city if resp.status.ok, otherwise it is null',
  })
  temp_c: number | null;
}
