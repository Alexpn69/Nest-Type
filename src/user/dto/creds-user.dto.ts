import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches } from 'class-validator';

const passwordRegEx = /^(?=.*[.,!_]).{6,}$/;

export class CredsUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'username', description: 'uniq login of user' })
  login: string;

  @IsString()
  @Matches(passwordRegEx, {
    message: `Password must contain minimum 6 digits, and one special character: . , ! _`,
  })
  @ApiProperty({ example: 'qwerty!', description: 'password' })
  password: string;
}
