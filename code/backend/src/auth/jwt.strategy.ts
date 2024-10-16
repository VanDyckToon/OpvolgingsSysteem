import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { GebruikerService } from '../gebruiker/gebruiker.service';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly gebruikerService: GebruikerService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }
  async validate(payload: JwtPayload) {
    const gebruiker = await this.gebruikerService.findOne(payload.gebruikerID);
    if (!gebruiker) {
      throw new Error('User not found');
    }
    return gebruiker;
  }
}
