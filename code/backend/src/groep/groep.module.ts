import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroepService } from './groep.service';
import { GroepController } from './groep.controller';
import { Groep } from './entities/groep.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Groep])],
  controllers: [GroepController],
  providers: [GroepService],
})
export class GroepModule {}
