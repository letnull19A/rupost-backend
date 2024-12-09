import { Controller, Get, Post, Put, Delete, Param, Bind } from '@nestjs/common';

@Controller('post')
export class PostController {
 @Get(':count')
 @Bind(Param('count'))
 getChunk(from, to): any {
  return [
   {id: 0, text: 'some text'}
  ]
 }
7
 @Get(':id')
 @Bind(Param('id'))
 getById(id: string): string {
  return 'some group woth id: ' + id
 }

 @Post()
 createPost(): string {
  return 'post created'
 }

 @Put(':id')
 @Bind(Param('id'))
 editPost(id): string {
  return 'post edited successfully!'
 }

 @Delete(':id')
 @Bind(Param('id'))
 deletePost(id): string {
  return `post with id: ${id} has been deleted!`
 }
}
