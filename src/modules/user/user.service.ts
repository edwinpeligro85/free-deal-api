import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudHelper } from 'src/crud-helper';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends CrudHelper<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo);
  }

  async findOneByEmail(email: string) {
    return await this.repo
      .createQueryBuilder('user')
      .where({ email })
      .addSelect('user.password')
      .getOne();
  }
}
