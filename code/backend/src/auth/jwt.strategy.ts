import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Extract the token from the header
      ignoreExpiration: false,  // Optionally handle token expiration
      secretOrKey: jwtConstants.secret,  // Use your secret key
    });
  }

  async validate(payload: any) {
    // Return the user payload (this will attach the user to the request)
    return { gebruikerID: payload.sub };  // Adjust based on your JWT payload structure
  }
}