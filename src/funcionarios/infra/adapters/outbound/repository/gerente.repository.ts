import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GerenteEntity } from '../../entities/gerente.entity';

@Injectable()
export class GerenteRepository extends Repository<GerenteEntity> {
   
}