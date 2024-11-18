import { Controller, Get } from '@nestjs/common';

@Controller('post')
export class PostController {
 @Get('/')
 getAll(): string {
  return "posts"
 }
}
