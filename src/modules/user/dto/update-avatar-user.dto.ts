import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserAvatarDto {
  @ApiProperty({
    example: 'https://docs.nestjs.com/assets/logo-small.svg',
  })
  avatar: string;
}
