import { ApiProperty } from '@nestjs/swagger';

export class EditUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  repeatPassword?: string;
}
