import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GebruikerModule } from 'src/gebruiker/gebruiker.module';

@Module({
  imports: [GebruikerModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
