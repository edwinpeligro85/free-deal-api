import { User } from 'src/modules/user/entities/user.entity';

export interface LoginStatus {
  accessToken: string;
  user: Partial<User>;
}
