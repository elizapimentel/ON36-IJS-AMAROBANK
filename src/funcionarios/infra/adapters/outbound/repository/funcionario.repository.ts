import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FuncionarioEntity } from '../../entities/funcionario.entity';


@Injectable()
export class FuncionariosRepository extends Repository<FuncionarioEntity> {

}