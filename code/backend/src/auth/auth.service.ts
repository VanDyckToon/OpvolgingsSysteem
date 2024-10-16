import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GebruikerService } from '../gebruiker/gebruiker.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private gebruikerService: GebruikerService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const gebruiker = await this.gebruikerService.findGebruikerByEmail(email);
    if (!gebruiker || !(await bcrypt.compare(password, gebruiker.wachtwoord))) {
      throw new UnauthorizedException();
    }
    const payload = {
      gebruikerID: gebruiker.gebruikerID,
      email: gebruiker.email,
      rol: gebruiker.rol.naam,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
