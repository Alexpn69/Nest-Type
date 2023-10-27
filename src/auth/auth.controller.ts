import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CredsUserDto } from 'src/user/dto/creds-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

@ApiTags('Authentication')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'SignIn user in App and create tokenApi for user' })
  @ApiResponse({ status: 201, type: User })
  @Post('/signin')
  signup(@Body() user: CreateUserDto) {
    return this.authService.signUp(user);
  }

  @ApiOperation({ summary: 'LogIn user in App' })
  @ApiResponse({ status: 201, type: User })
  @Post('/login')
  login(@Body() user: CredsUserDto) {
    return this.authService.login(user);
  }
}
