import { ApiProperty } from '@nestjs/swagger';
import { Rol } from '../../rol/entities/rol.entity';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { JoinColumn } from 'typeorm';
import { Subgroep } from '../../subgroep/entities/subgroep.entity';
import { Gebruiker } from '../entities/gebruiker.entity';

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

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  wachtwoord: string;

  @ApiProperty()
  subgroep: Subgroep;

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

  @ApiProperty({ default: null })
  begeleider: Gebruiker;
}
