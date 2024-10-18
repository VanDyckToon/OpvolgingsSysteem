import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GebruikerService } from '../gebruiker/gebruiker.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly gebruikerService: GebruikerService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const gebruiker = await this.gebruikerService.findGebruikerByEmail(email);
    if (!gebruiker || !(await bcrypt.compare(pass, gebruiker.wachtwoord))) {
      throw new UnauthorizedException();
    }
    const payload = {
      gebruikerID: gebruiker.gebruikerID,
      rol: gebruiker.rol,
      email: gebruiker.email,
    };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
