import { Injectable } from '@nestjs/common';
import { Cliente } from '../entities/cliente.entity';
import { randomUUID as uuid } from 'crypto';

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
    return cliente || null;
  }

  salvar(cliente: Cliente): Cliente {
    this.clientes = this.clientes.map((c) =>
      c.id === cliente.id ? cliente : c,
    );
    return cliente;
  }

  removerCliente(id: string): void {
    const clienteIndex = this.clientes.findIndex((cliente) => cliente.id === id);
    this.clientes.splice(clienteIndex, 1);
  }
}
