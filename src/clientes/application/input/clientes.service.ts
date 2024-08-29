import { Injectable, NotFoundException } from '@nestjs/common';
import { IClienteService } from './IClienteService.interface';
import { ClientesRepository } from '../../../clientes/infra/adapters/outbound/repository/clientes.repository';
import { CreateClienteDto } from '../../../clientes/infra/adapters/inbound/dto/create-cliente.dto';
import { UpdateClienteDto } from '../../../clientes/infra/adapters/inbound/dto/update-cliente.dto';
import { FuncionariosRepository } from '../../../funcionarios/infra/adapters/outbound/repository/funcionario.repository';
import { ClienteEntity } from '../../../clientes/infra/adapters/entities/cliente.entity'; 
import { FuncionarioEntity } from '../../../funcionarios/infra/adapters/entities/funcionario.entity'; 
import { GerenteEntity } from '../../../funcionarios/infra/adapters/entities/gerente.entity';
import { TipoCargo } from '../../../common/enums/tipo-.banco.enum';
import { ContaEntity } from '../../../contas/infra/adapters/entities/conta.entity';


@Injectable()
export class ClientesService implements IClienteService {
  constructor(
    private clienteRepo: ClientesRepository,
    private funcionarioRepo: FuncionariosRepository,
  ) { }

  async cadastrarCliente(
    funcionario: FuncionarioEntity,
    criarClienteDto: CreateClienteDto
  ): Promise<ClienteEntity> {
    if (funcionario.cargo !== TipoCargo.GERENTE) {
      throw new NotFoundException(`Funcionário não autorizado`);
    }

    const { nomeCompleto, endereco, telefones, gerenteId } = criarClienteDto;
    const novoCliente = new ClienteEntity();
    novoCliente.nomeCompleto = nomeCompleto;
    novoCliente.endereco = endereco;
    novoCliente.telefones = telefones;

    if (gerenteId) {
      const gerente = await this.funcionarioRepo.findOne({
        where: { id: gerenteId },
      });
      if (gerente instanceof GerenteEntity) {
        novoCliente.gerente = gerente;
      }
    }
    return this.clienteRepo.save(novoCliente);
  }

  async listarTodos(): Promise<ClienteEntity[]> {
    return this.clienteRepo.find();
  }

  async encontrarPorId(id: string): Promise<ClienteEntity> {
    const cliente = await this.clienteRepo.findOne({
       where: { id: id },
    });
    if (!cliente) {
      throw new NotFoundException(`Cliente com id ${id} não encontrado`);
    }
    return cliente;
  }

  async atualizarCliente(id: string, updateClienteDto: UpdateClienteDto): Promise<ClienteEntity> {
    const cliente = await this.encontrarPorId(id);
    const clienteAtualizado = {
      ...cliente,
      ...updateClienteDto,
    };

    return this.clienteRepo.save(clienteAtualizado);
  }

  async removerCliente(id: string): Promise<void> {
    const cliente = await this.encontrarPorId(id);
    await this.clienteRepo.remove(cliente);
  }

  async adicionarConta(clienteId: string, conta: ContaEntity): Promise<ClienteEntity> {
    const cliente = await this.encontrarPorId(clienteId);
    if (!cliente) {
      throw new NotFoundException(`Cliente com id ${clienteId} não encontrado`);
    }

    cliente.contas.push(conta);
    return this.clienteRepo.save(cliente);
  }
}
