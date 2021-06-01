import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudHelper } from 'src/crud-helper';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends CrudHelper<User> {
  constructor(@InjectRepository(User) repo) {
    super(repo);
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const { email } = userDto;

    const userInDb = await this.repo.findOne({ where: { email } });

    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user = Object.assign(new User(), userDto);

    return await user.save();
  }

  async findOneByEmail(email: string) {
    return await this.repo
      .createQueryBuilder('user')
      .where({ email })
      .addSelect('user.password')
      .getOne();
  }

  async orders(user: User) {
    return await this.repo.findOne({
      where: { id: user.id},
      relations: ['orders', 'orders.cart']
    })
  }
}
