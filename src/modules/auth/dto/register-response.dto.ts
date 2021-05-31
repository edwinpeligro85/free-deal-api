import { User } from 'src/modules/user/entities/user.entity';

export class RegisterResponseDto {
  success: boolean;
  message: string;
  user: User;

  constructor(success: boolean, message: string, user: User) {
    this.success = success;
    this.message = message;
    this.user = user;
  }
}
