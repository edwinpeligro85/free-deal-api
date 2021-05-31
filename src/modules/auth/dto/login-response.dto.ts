import { User } from 'src/modules/user/entities/user.entity';

export class LoginResponseDto {
  accessToken: string;
  user: User;

  constructor(accessToken: string, user: Partial<User>) {
    this.accessToken = accessToken;
    this.user = user as User;
  }
}
