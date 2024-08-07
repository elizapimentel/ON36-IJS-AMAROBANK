import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import * as fs from 'fs';
import * as path from 'path';
import { Cliente } from '../entities/cliente.entity';
import {
  Funcionario,
  TipoCargo,
} from 'src/funcionarios/entities/funcionario.entity';
import { Contas } from 'src/contas/entities/conta.entity';

@Injectable()
export class ClientesService {
  private readonly filePath = path.resolve('src/clientes/clientes.json');
  private idCounter: number;

  constructor() {
    const cliente = this.readClientes();
    this.idCounter =
      cliente.length > 0 ? cliente[cliente.length - 1].id + 1 : 1;
  }

  private readClientes(): Cliente[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Cliente[];
  }

  private writeClientes(cliente: Cliente[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(cliente, null, 2), 'utf8');
  }

  cadastrarCliente(
    funcionario: Funcionario,
    createClienteDto: CreateClienteDto,
  ) {
    const clientes = this.readClientes();

    if (funcionario.cargo !== TipoCargo.GERENTE) {
      throw new NotFoundException(`Funcionário não autorizado`);
    }

    const novoCliente = new Cliente(
      this.idCounter++,
      createClienteDto.nomeCompleto,
      createClienteDto.endereco,
      createClienteDto.telefone,
      createClienteDto.contas,
      createClienteDto.gerente,
    );

    clientes.push(novoCliente);
    this.writeClientes(clientes);
    return novoCliente;
  }

  findAll(): Cliente[] {
    return this.readClientes();
  }

  findById(id: number): Cliente {
    const clientes = this.readClientes();
    const cliente = clientes.find((cliente) => cliente.id === id);

    if (!cliente) {
      throw new NotFoundException(`Cliente com id ${id} não encontrado`);
    }

    return cliente;
  }

  atualizarCliente(id: number, updateClienteDto: UpdateClienteDto): Cliente {
    const clientes = this.readClientes();
    const clienteIndex = clientes.findIndex((cliente) => cliente.id === id);

    if (clienteIndex === -1) {
      throw new NotFoundException(`Cliente com id ${id} não encontrado`);
    }

    const clienteAtualizado = {
      ...clientes[clienteIndex],
      ...updateClienteDto,
    };
    clientes[clienteIndex] = clienteAtualizado;
    this.writeClientes(clientes);
    return clienteAtualizado;
  }

  removerCliente(id: number):void {
    const clientes = this.readClientes();
    const clienteIndex = clientes.findIndex((cliente) => cliente.id === id);

    if (clienteIndex === -1) {
      throw new NotFoundException(`Cliente com id ${id} não encontrado`);
    }

    clientes.splice(clienteIndex, 1);
    this.writeClientes(clientes);
  }

  mostrarContasCliente(id: number): Contas[] {
    const clientes = this.readClientes();
    const cliente = clientes.find((cliente) => cliente.id === id);

    if (!cliente) {
      throw new NotFoundException(`Cliente com id ${id} não encontrado`);
    }

    return cliente.contas;
  }
}
