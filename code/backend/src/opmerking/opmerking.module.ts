import { Module } from '@nestjs/common';
import { OpmerkingService } from './opmerking.service';
import { OpmerkingController } from './opmerking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opmerking } from './entities/opmerking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Opmerking])],
  controllers: [OpmerkingController],
  providers: [OpmerkingService],
})
export class OpmerkingModule {}
