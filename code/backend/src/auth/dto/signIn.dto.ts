import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsEmail()
  emails: string;

  @ApiProperty()
  @IsNotEmpty()
  wachtwoord: string;
}
