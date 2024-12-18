import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id): Promise<User> {
    return await this.userRepository.findOneBy({ id: id });
  }

  async findByLogin(login: string): Promise<User> {
    return await this.userRepository.findOneBy({
      email: login,
    });
  }

  async deleteById(id: string): Promise<void> {
    const currentUser = await this.findOne(id);

    if (!currentUser) throw new Error('user not found');

    await currentUser.remove();
  }
}
