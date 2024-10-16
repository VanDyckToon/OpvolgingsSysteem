import { Injectable, UnauthorizedException } from '@nestjs/common';
import { GebruikerService } from '../gebruiker/gebruiker.service';

@Injectable()
export class AuthService {
  constructor(private gebruikerService: GebruikerService) {}

  async singIn(email: string, pass: string): Promise<any> {
    const gebruiker = await this.gebruikerService.findGebruikerByEmail(email);
    if (gebruiker?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = gebruiker;
    return result;
  }
}
