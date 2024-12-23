import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @Inject('POST_REPOSITORY')
    private PostRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return await this.PostRepository.find();
  }

  async findOne(id): Promise<Post> {
    return await this.PostRepository.findOneBy({ id: id });
  }
  
  async deleteById(id: string): Promise<void> {
    const currentUser = await this.findOne(id);

    if (!currentUser) throw new Error('user not found');

    await currentUser.remove();
  }
}

