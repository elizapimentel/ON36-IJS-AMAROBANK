import { Injectable, NotFoundException } from '@nestjs/common';
import { Cliente } from '../entities/cliente.entity';
import { randomUUID as uuid } from 'crypto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';

@Injectable()
export class ClientesRepository {
  private clientes: Cliente[] = [];

  constructor() {}

  cadastrarCliente(cliente: Cliente): Cliente {
    cliente.id = uuid();
    this.clientes.push(cliente);
    return cliente;
  }

  listarTodos(): Cliente[] {
    return this.clientes;
  }

  encontrarPorId(id: string): Cliente {
    const cliente = this.clientes.find((cliente) => cliente.id === id);
    return cliente;
  }

  atualizarCliente(id: string, atualizaCliente: UpdateClienteDto): Cliente {
    const cliente = this.clientes.find((cliente) => cliente.id === id);
    const clienteAtualizado = {
      ...cliente,
      ...atualizaCliente,
    };
    this.clientes = this.clientes.map((cliente) =>
      cliente.id === id ? clienteAtualizado : cliente,
    );
    return clienteAtualizado;
  }

  removerCliente(id: string): void {
    const clienteIndex = this.clientes.findIndex((cliente) => cliente.id === id);
    this.clientes.splice(clienteIndex, 1);
  }
}
