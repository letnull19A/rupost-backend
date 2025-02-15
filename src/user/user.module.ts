import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { userProviders } from './user.providers';
import { DatabaseModule } from './../database/database.module';
// import { databaseProviders }

@Module({
  imports: [DatabaseModule],
  providers: [
   ...userProviders,
   UserService
  ],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
