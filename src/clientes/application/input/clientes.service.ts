import { Injectable, NotFoundException } from '@nestjs/common';
import { IClienteService } from './IClienteService.interface';
import { Cliente } from '../../../clientes/domain/entities/cliente.entity';
import { ClientesRepository } from '../../../clientes/infra/adapters/outbound/repository/clientes.repository';
import { CreateClienteDto } from '../../../clientes/infra/adapters/inbound/dto/create-cliente.dto';
import { UpdateClienteDto } from '../../../clientes/infra/adapters/inbound/dto/update-cliente.dto';
import { TipoCargo } from '../../../common/enums/tipo-.banco.enum';
import { Funcionario } from '../../../funcionarios/domain/entities/funcionario.entity';
import { Gerente } from '../../../funcionarios/domain/entities/gerente.entity';
import { FuncionariosRepository } from '../../../funcionarios/infra/adapters/outbound/repository/funcionario.repository';



@Injectable()
export class ClientesService implements IClienteService {
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
    const cliente = this.clienteRepo.encontrarPorId(id);
    if (!cliente) {
      throw new NotFoundException(`Cliente com id ${id} não encontrado`);
    }
    return cliente;
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
