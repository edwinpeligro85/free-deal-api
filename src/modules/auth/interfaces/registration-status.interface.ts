import { User } from 'src/modules/user/entities/user.entity';

export interface RegistrationStatus {
  success: boolean;
  message: string;
  user: User;
}
