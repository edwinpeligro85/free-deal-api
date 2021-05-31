import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { RegisterResponseDto } from './dto/register-response.dto';
import { LocalAuthGuard } from './guards';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly _auth: AuthService) {}

  @Post('register')
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegisterResponseDto> {
    const result: RegisterResponseDto = await this._auth.register(
      createUserDto,
    );

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  // @ApiResponse({ status: 200, type: RefreshResponseDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Request() req,
  ): Promise<LoginResponseDto> {
    return await this._auth.login(req.user);
  }

  @Auth()
  @Post('refresh')
  refresh(@Request() req: any): RefreshResponseDto {
    const response = new RefreshResponseDto();
    response.accessToken = this._auth.createToken(req.user);
    return response;
  }
}
