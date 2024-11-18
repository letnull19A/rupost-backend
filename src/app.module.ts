import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostController } from './post/post.controller';

@Module({
  imports: [],
  controllers: [AppController, PostController],
  providers: [AppService],
})
export class AppModule {}
