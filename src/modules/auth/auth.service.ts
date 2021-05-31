import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _user: UserService,
    private jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto): Promise<RegisterResponseDto> {
    const status: RegisterResponseDto = new RegisterResponseDto(
      true,
      'user registered',
      null,
    );

    try {
      status.user = await this._user.create(userDto);
    } catch (err) {
      status.success = false;
      status.message = err;
    }
    return status;
  }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<{ user: Partial<User>; message: HttpException }> {
    const user = await this._user.findOneByEmail(email);

    if (!user) {
      return {
        user: null,
        message: new HttpException('User not found', HttpStatus.UNAUTHORIZED),
      };
    }

    const areEqual = await compare(pass, user.password);

    if (!areEqual) {
      return {
        user: null,
        message: new HttpException(
          'Invalid credentials',
          HttpStatus.UNAUTHORIZED,
        ),
      };
    }

    const { password, ...result } = user;

    return { user: result, message: null };
  }

  async login(user: User): Promise<LoginResponseDto> {
    const { password, ...result } = user;

    return new LoginResponseDto(this.createToken(user), result);
  }

  createToken(user: User): string {
    const payload: JwtPayload = { ...user, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
