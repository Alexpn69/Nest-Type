import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  login: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  @ApiProperty({ example: 'Obama', description: 'Lastname of user' })
  fio: string;

  @Column({ type: 'varchar' })
  @ApiProperty({
    example: '5d8e7ba6-3840-4088-abc1-f1835b0ab585',
    description: 'api token for access',
  })
  apiToken: string;
}
