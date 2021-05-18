import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private _auth: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(username: string, password: string): Promise<Partial<User>> {
    const response = await this._auth.validateUser(username, password);

    if (!response.user) {
      throw response.message;
    }

    return response.user;
  }
}
