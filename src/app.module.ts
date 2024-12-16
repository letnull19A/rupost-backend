import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PostController } from './post/post.controller';
import { UserController } from './user/user.controller';
import { GroupsController } from './groups/groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user/user.entity'
import { UserModule } from './user/user.module'
import { DatabaseModule } from './database/database.module'
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  controllers: [PostController, UserController, GroupsController, AuthController],
  providers: [AppService],
})
export class AppModule {}
