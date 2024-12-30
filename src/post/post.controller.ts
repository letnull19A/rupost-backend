import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Bind,
  Body,
  HttpStatus,
  HttpException
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto'
import { Post as Publication } from './post.entity'
import { ApiBearerAuth } from '@nestjs/swagger'
import { PostService }  from './post.service'
import { Public } from './../auth/decorators/public.decorator'
import { UserService } from './../user/user.service'

@Controller('post')
export class PostController {

  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService) {}

  @Public()
  @Get()
  getChunk(): any {

    const postList = this.postService.findAll()
    return postList;
  }

  @Get(':id')
  @Public()
  @Bind(Param('id'))
  getById(id: string) {

    if (id === undefined || id === '') {
       throw new HttpException({
        message: 'id field is empty or undefined', 
        status: HttpStatus.BAD_REQUEST
       }, HttpStatus.BAD_REQUEST)
    }

    const result = this.postService.findOne(id)

    if (result === undefined) {
       throw new HttpException({
           status: HttpStatus.NOT_FOUND,
           message: 'post not found'
       }, HttpStatus.BAD_REQUEST)
    }

    return result
  }

  @Post()
  @ApiBearerAuth()
  createPost(@Body() post: CreatePostDto) {

    const userIsExist = this.userService
       .findOne(post.user_id) !== undefined

    if (!userIsExist) 
       throw new HttpException({
           message: 'user not found',
           status: HttpStatus.NOT_FOUND
       }, HttpStatus.NOT_FOUND) 

    const newPost = new Publication()
    newPost.text = post.text
    newPost.author_id = post.user_id

    newPost.save()
    return newPost;
  }

  @Put(':id')
  @Bind(Param('id'))
  editPost(id): string {
    return 'post edited successfully!';
  }

  @Delete(':id')
  @Bind(Param('id'))
  deletePost(id): string {
    return `post with id: ${id} has been deleted!`;
  }
}
