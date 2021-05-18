import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from 'src/config/config.keys';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { User } from 'src/modules/user/entities/user.entity';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private _config: ConfigService,
    private readonly _user: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _config.get<string>(Configuration.JWT_SECRET),
    });
  }

  async validate(payload: JwtPayload) {
    const { sub: id } = payload;

    const user: User = await this._user.findOne(id);

    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }

    const { role, password, ...result } = user;

    return { roles: [role], ...result };
  }
}
