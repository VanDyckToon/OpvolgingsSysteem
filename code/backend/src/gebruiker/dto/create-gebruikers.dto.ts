import { ApiProperty } from '@nestjs/swagger';
import { Rol } from '../../rol/entities/rol.entity';
import { IsNotEmpty } from 'class-validator';
import { JoinColumn } from 'typeorm';

export class CreateGebruikerDto {
  @ApiProperty()
  @JoinColumn({ name: 'rolID' })
  @IsNotEmpty()
  rol: Rol;

  @ApiProperty()
  @IsNotEmpty()
  voornaam: string;

  @ApiProperty()
  @IsNotEmpty()
  achternaam: string;

  @ApiProperty({ default: null })
  straat: string = null;

  @ApiProperty({ default: null })
  huisNummer: string = null;

  @ApiProperty({ default: null })
  postcode: string = null;

  @ApiProperty({ default: null })
  woonplaats: string = null;

  @ApiProperty({ default: null })
  ICENaam: string = null;

  @ApiProperty({ default: null })
  ICETelefoonnummer: string = null;

  @ApiProperty({ default: null })
  foto: string = null;
}