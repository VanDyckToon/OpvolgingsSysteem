import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpleidingService } from './opleiding.service';
import { OpleidingController } from './opleiding.controller';
import { Opleiding } from './entities/opleiding.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Opleiding])],
  controllers: [OpleidingController],
  providers: [OpleidingService],
})
export class OpleidingModule {}
