import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { Cliente } from '../entities/cliente.entity';
import { Funcionario } from '../../funcionarios/entities/funcionario.entity';
import { TipoCargo } from '../../common/enums/tipo-.banco.enum';
import { ClientesRepository } from '../repository/clientes.repository';
import { FuncionariosRepository } from '../../funcionarios/repository/funcionario.repository';
import { Gerente } from '../../funcionarios/entities/gerente.entity';

@Injectable()
export class ClientesService {
  public clientes: Cliente[] = [];

  constructor(
    private clienteRepo: ClientesRepository,
    private funcionarioRepo: FuncionariosRepository,
  ) { }

  async cadastrarCliente(
    funcionario: Funcionario,
    criarClienteDto: CreateClienteDto,
  ): Promise<Cliente> {
    if (funcionario.cargo !== TipoCargo.GERENTE) {
      throw new NotFoundException(`Funcionário não autorizado`);
    }

    const { nomeCompleto, endereco, telefones, gerenteId } = criarClienteDto;

    const novoCliente = new Cliente(nomeCompleto, endereco, telefones);

    if (gerenteId) {
      const gerente = await this.funcionarioRepo.buscarGerentePorId(gerenteId);
      if (gerente instanceof Gerente) {
        novoCliente.gerente = gerente;
      }
    }
    return this.clienteRepo.cadastrarCliente(novoCliente);
  }

  listarTodos(): Cliente[] {
    return this.clienteRepo.listarTodos();
  }

  encontrarPorId(id: string): Cliente {
    const cliente = this.clientes.find((cliente) => cliente.id === id);
    if (!cliente) {
      throw new NotFoundException(`Cliente com id ${id} não encontrado`);
    }
    return this.clienteRepo.encontrarPorId(id);
  }

  atualizarCliente(id: string, updateClienteDto: UpdateClienteDto): Cliente {
    const cliente = this.clienteRepo.encontrarPorId(id);
    if (!cliente) {
      throw new NotFoundException(`Cliente com id ${id} não encontrado`);
    }

    const clienteAtualizado = {
      ...cliente,
      ...updateClienteDto,
    };

    return this.clienteRepo.salvar(clienteAtualizado);
  };

  removerCliente(id: string): void {
    const cliente = this.encontrarPorId(id);
    this.clienteRepo.removerCliente(cliente.id);
  }

}
