import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  user_id: string
}
