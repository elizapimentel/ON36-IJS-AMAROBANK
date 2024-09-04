import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClienteEntity } from '../../entities/cliente.entity';


@Injectable()
export class ClientesRepository extends Repository<ClienteEntity> {

}
