import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GebruikerModule } from '../gebruiker/gebruiker.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Gebruiker } from '../gebruiker/entities/gebruiker.entity';
import { JwtStrategy } from './jwt.strategy';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    GebruikerModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    Gebruiker,
    JwtStrategy,
    AuthGuard,
    { provide: 'APP_GUARD', useClass: AuthGuard },
  ],
  exports: [AuthService],
})
export class AuthModule {}
