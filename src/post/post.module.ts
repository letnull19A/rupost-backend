import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { Post } from './post.entity';
import { postProviders } from './post.providers';
import { DatabaseModule } from './../database/database.module';
import { UserModule } from './../user/user.module'

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [...postProviders, PostService],
  controllers: [PostController],
  exports: [PostService],
})

export class PostModule {}
