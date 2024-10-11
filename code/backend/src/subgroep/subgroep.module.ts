import { Module } from '@nestjs/common';
import { SubgroepService } from './subgroep.service';
import { SubgroepController } from './subgroep.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subgroep } from './entities/subgroep.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subgroep])],
  controllers: [SubgroepController],
  providers: [SubgroepService],
})
export class SubgroepModule {}
