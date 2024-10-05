import { Injectable, NotFoundException } from '@nestjs/common';
import { IClienteService } from './IClienteService.interface';
import { ClientesRepository } from '../../../clientes/infra/adapters/outbound/repository/clientes.repository';
import { UpdateClienteDto } from '../../../clientes/infra/adapters/inbound/dto/update-cliente.dto';
import { ClienteEntity } from '../../../clientes/infra/adapters/entities/cliente.entity'; 
import { UUID } from 'crypto';


@Injectable()
export class ClientesService implements IClienteService {
  constructor(
    private clienteRepo: ClientesRepository,
  ) { }

  

  async encontrarPorId(id: UUID): Promise<ClienteEntity> {
    const cliente = await this.clienteRepo.findOne({
       where: { id: id },
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente com id ${id} não encontrado`);
    }
    return cliente;
  }

  async atualizarCliente(id: UUID, updateClienteDto: UpdateClienteDto): Promise<ClienteEntity> {
    const cliente = await this.encontrarPorId(id);
    const clienteAtualizado = {
      ...cliente,
      ...updateClienteDto,
    };

    return this.clienteRepo.save(clienteAtualizado);
  }

  async removerCliente(id: UUID): Promise<void> {
    const cliente = await this.encontrarPorId(id);
    await this.clienteRepo.remove(cliente);
  }

}
