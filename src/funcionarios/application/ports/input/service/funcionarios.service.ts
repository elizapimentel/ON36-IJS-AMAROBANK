import { Injectable, NotFoundException } from '@nestjs/common';
import { TipoCargo } from '../../../../../common/enums/tipo-.banco.enum';
import { FuncionariosFactory } from '../../../../../funcionarios/domain/factory/funcionarios.factory';
import { CreateFuncionarioDto } from '../../../../../funcionarios/infra/adapters/inbound/dto/create-funcionario.dto';
import { FuncionariosRepository } from '../../../../../funcionarios/infra/adapters/outbound/repository/funcionario.repository';
import { IFuncionarioService } from './IFuncionario.service';
import { FuncionarioEntity } from '../../../../../funcionarios/infra/adapters/entities/funcionario.entity';
import { UpdateFuncionarioDto } from '../../../../../funcionarios/infra/adapters/inbound/dto/update-funcionario.dto';
import { UUID } from 'crypto';


@Injectable()
export class FuncionariosService implements IFuncionarioService {
  constructor(
    private funcionarioRepo: FuncionariosRepository,
    private funcionatrioFactory: FuncionariosFactory,
  ) { }

  cadastrarFuncionario(
    type: TipoCargo,
    funcionario: CreateFuncionarioDto,
  ): Promise<FuncionarioEntity> {
    const funcionarios = this.funcionatrioFactory.criarFuncionario(
      type,
      funcionario,
    );
    return this.funcionarioRepo.save(funcionarios);
  }

  async listarTodos(): Promise<FuncionarioEntity[]> {
    return this.funcionarioRepo.find();
  }

  async findFuncionarioById(id: UUID): Promise<FuncionarioEntity | undefined> {
    const funcionario = await this.funcionarioRepo.findOne({
      where: { id: id },
    });
    if (!funcionario) {
      throw new NotFoundException(`Funcionário com id ${id} não encontrado`);
    }
    return funcionario;
  }

  async findFuncionarioByCargo(cargo: TipoCargo): Promise<FuncionarioEntity[]> {
    const funcionarios = await this.funcionarioRepo.find({
      where: { cargo: cargo },
    });
    if (!funcionarios) {
      throw new NotFoundException(`Funcionário com cargo ${cargo} não encontrado`);
    }
    return funcionarios;
  }

  async atualizarDadosFuncionario(
    id: UUID,
    updateFuncionario: UpdateFuncionarioDto,
  ): Promise<FuncionarioEntity> {
    const funcionario = await this.funcionarioRepo.findOne({
      where: { id: id },
    });
    if (!funcionario) {
      throw new NotFoundException(`Funcionário com id ${id} não encontrado`);
    }

    funcionario.nomeCompleto = updateFuncionario.nomeCompleto || funcionario.nomeCompleto;
    funcionario.endereco = updateFuncionario.endereco || funcionario.endereco;
    funcionario.telefones = updateFuncionario.telefones || funcionario.telefones;
    funcionario.cargo = updateFuncionario.cargo || funcionario.cargo;

    return this.funcionarioRepo.save(funcionario);

  }

  async removerFuncionario(id: UUID): Promise<void> {
    const funcionario = await this.findFuncionarioById(id);
    await this.funcionarioRepo.remove(funcionario);

  }

}
