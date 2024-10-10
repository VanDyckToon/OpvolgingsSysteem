import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MateriaalService } from './materiaal.service';
import { MateriaalController } from './materiaal.controller';
import { Materiaal } from './entities/materiaal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Materiaal])],
  controllers: [MateriaalController],
  providers: [MateriaalService],
})
export class MateriaalModule {}
