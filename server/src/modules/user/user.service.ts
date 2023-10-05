import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { USER_REPOSITORY } from '../../core/constants';
import { UpdateUserDTO } from './dto/update-user.dto';
import { RegisterUserDTO } from '../../core/auth/dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: typeof User,
  ) {}

  async findAll(): Promise<Array<User>> {
    return this.userRepo.findAll();
  }

  async findOne(uuid: string): Promise<User> {
    const user = await this.userRepo.findByPk(uuid, { include: ['journals'] });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ where: { email: email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async create(userDTO: RegisterUserDTO): Promise<User> {
    return this.userRepo.create(userDTO);
  }

  async update(uuid: string, updateUser: UpdateUserDTO): Promise<User> {
    const user = await this.findOne(uuid);
    if (!user) throw new NotFoundException('User not found');

    await this.userRepo.update(updateUser, { where: { uuid } });
    // Fetch the user again to get the updated instance
    const updatedUser = await this.findOne(uuid);
    return updatedUser;
  }

  async remove(uuid: string): Promise<void> {
    const user = await this.findOne(uuid);
    if (!user) throw new NotFoundException('User not found');
    await this.userRepo.destroy({ where: { uuid } });
  }
}
