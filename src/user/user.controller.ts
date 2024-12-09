import { Body, Post, Controller, Get, Put, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './user.entity'
import { createHash, randomInt } from 'node:crypto'

@Controller('user')
export class UserController {
 constructor(private readonly userService: UserService) {}

 @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Post()
  async create(@Body() body: CreateUserDto): 
   Promise<User> {
   const user = new User()

   const {name, surname, password, email, nickname} = body

   const passwordHash = createHash('sha-256')
    .update(password)
    .digest('base64')

   const generatedNickname = nickname === undefined 
    || nickname === '' ? name + '_' + surname 
    : nickname

   user.name = name
   user.surname = surname
   user.email = email
   user.password = passwordHash
   user.nickname = nickname + randomInt(0, 256)

   await user.save()

   return user
  }
}
