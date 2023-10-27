import { CredsUserDto } from './../user/dto/creds-user.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import * as uuid from 'uuid';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUp(
    user: CreateUserDto,
  ): Promise<{ apiToken: string; fio: string }> {
    const applicant = await this.userService.getUserByProperty(
      'login',
      user.login,
    );
    if (applicant) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    const hashPass = await bcrypt.hash(user.password, 7);
    const apiToken = uuid.v4();
    const newUser = await this.userService.createUser({
      ...user,
      password: hashPass,
      apiToken,
    });
    return { fio: newUser.fio, apiToken: newUser.apiToken };
  }

  async login(creds: CredsUserDto): Promise<{ apiToken: string; fio: string }> {
    const user = await this.userService.getUserByProperty('login', creds.login);
    const isValid = await bcrypt.compare(creds.password, user.password);
    if (user && isValid) {
      return { apiToken: user.apiToken, fio: user.fio };
    }
    throw new UnauthorizedException({ message: 'Bad creds' });
  }
}
