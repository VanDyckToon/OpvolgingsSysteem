import { Injectable } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}
  create(createRolDto: CreateRolDto) {
    return this.rolRepository.save(createRolDto);
  }

  findAll() {
    return this.rolRepository.find();
  }

  findOne(rolID: number) {
    return this.rolRepository.findOneBy({ rolID });
  }

  update(rolID: number, updateRolDto: UpdateRolDto) {
    return this.rolRepository.update(rolID, updateRolDto);
  }

  remove(rolID: number) {
    return this.rolRepository.delete({ rolID });
  }
}
