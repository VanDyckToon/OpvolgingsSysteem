import { ApiProperty } from '@nestjs/swagger';
import { Rol } from '../../rol/entities/rol.entity';

export class CreateGebruikerDto {
  @ApiProperty()
  voornaam: string;

  @ApiProperty()
  achternaam: string;

  @ApiProperty({ nullable: true })
  straat: string;

  @ApiProperty({ nullable: true })
  huisNummer: string;

  @ApiProperty({ nullable: true })
  postcode: string;

  @ApiProperty({ nullable: true })
  woonplaats: string;

  @ApiProperty({ nullable: true })
  rijksregisternummer: string;

  @ApiProperty({ nullable: true })
  datumInDienst: Date;

  @ApiProperty({ nullable: true })
  verplaatsingWerk: string;

  @ApiProperty({ nullable: true })
  nationaliteit: string;

  @ApiProperty({ nullable: true })
  geboortePlaats: string;

  @ApiProperty({ nullable: true })
  geboorteDatum: Date;

  @ApiProperty({ nullable: true })
  mutualiteit: string;

  @ApiProperty({ nullable: true })
  uitbetalingsInstelling: string;

  @ApiProperty({ nullable: true })
  rijbewijs: string;

  @ApiProperty({ nullable: true })
  ICENaam: string;

  @ApiProperty({ nullable: true })
  ICETelefoonnummer: string;

  @ApiProperty({ nullable: true })
  GTB_VDAB: string;

  @ApiProperty({ nullable: true })
  OCMW: string;

  @ApiProperty({ nullable: true })
  BegeleidWonen: string;

  @ApiProperty({ nullable: true })
  andere: string;

  @ApiProperty({ nullable: true })
  foto: string;

  @ApiProperty()
  rol: Rol;
}
