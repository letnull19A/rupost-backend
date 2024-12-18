import {
  HttpStatus,
  HttpException,
  Body,
  Post,
  Controller,
  Get,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { createHash, randomInt } from 'node:crypto';
import { Public } from './../auth/decorators/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    //TODO: add not found handler
    return this.userService.findOne(id);
  }

  @Get()
  @ApiBearerAuth()
  async getAll() {
    const result = this.userService.findAll();

    if (!result)
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'user not found',
        },
        HttpStatus.NOT_FOUND,
      );
  }

  @Post()
  @Public()
  async create(@Body() body: CreateUserDto): Promise<User> {
    const user = new User();

    const { name, surname, password, repeatPassword, email, nickname } = body;

    //TODO: move to middleware
    const passwordHash = createHash('sha-256')
      .update(password)
      .digest('base64');

    //TODO: move to middleware
    const repeatPasswordHash = createHash('sha-256')
      .update(repeatPassword)
      .digest('base64');

    //TODO: move to middleware
    if (passwordHash != repeatPasswordHash) throw new Error();

    const generatedNickname =
      nickname === undefined || nickname === ''
        ? name + '_' + surname
        : nickname;

    user.name = name;
    user.surname = surname;
    user.email = email;
    user.password = passwordHash;
    user.nickname = nickname + randomInt(0, 256);

    await user.save();

    return user;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<string> {
    this.userService.deleteById(id);

    return 'success!';
  }
}
