import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly _user: UserService) {}

  async validateUser(email: string, pass: string): Promise<Partial<User> | null> {
    const user = await this._user.findOneByEmail(email);

    if (user && (await compare(pass, user.password))) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }
}
