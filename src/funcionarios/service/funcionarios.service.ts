import { Injectable } from '@nestjs/common';
import { Funcionario } from '../entities/funcionario.entity';
import { CreateFuncionarioDto } from '../dto/create-funcionario.dto';
import { FuncionariosFactory } from '../../factories/funcionarios/funcionarios.factory';
import { FuncionariosRepository } from '../repository/funcionario.repository';
import { TipoCargo } from '../../common/enums/tipo-.banco.enum';
import { Gerente } from '../entities/gerente.entity';

@Injectable()
export class FuncionariosService {
  constructor(
    private funcionarioRepo: FuncionariosRepository,
    private funcionatrioFactory: FuncionariosFactory,
  ) {}

  cadastrarFuncionario(
    type: TipoCargo,
    funcionario: CreateFuncionarioDto,
  ): Funcionario {
    const funcionarios = this.funcionatrioFactory.criarFuncionario(
      type,
      funcionario,
    );
    return this.funcionarioRepo.cadastrarFuncionario(funcionarios);
  }

  findAll(): Funcionario[] {
    return this.funcionarioRepo.listarTodos();
  }

  findGerenteById(id: string): Gerente | undefined{
    return this.funcionarioRepo.buscarGerentePorId(id);
  }

  findFuncionarioById(id: string): Funcionario | undefined{
    return this.funcionarioRepo.buscarFuncionarioPorId(id);
  }

  //update
  /* atualizarDadosFuncionario(
    id: number,
    updateFuncionario: UpdateFuncionarioDto,
  ): Funcionario {
    const funcionarios = this.readFuncionarios();
    const funcionarioIndex = funcionarios.findIndex((f) => f.id === id);

    if (funcionarioIndex === -1) {
      throw new NotFoundException(`Funcionario com ID ${id} não encontrado`);
    }

    const atualizarFuncionario = {
      ...funcionarios[funcionarioIndex],
      ...updateFuncionario,
    };
    funcionarios[funcionarioIndex] = atualizarFuncionario;
    this.writeFuncionarios(funcionarios);
    return atualizarFuncionario;
  }

  // Delete
  removerFuncionario(id: number): void {
    const funcionarios = this.readFuncionarios();
    const updatedFuncionarios = funcionarios.filter((f) => f.id !== id);

    if (funcionarios.length === updatedFuncionarios.length) {
      throw new NotFoundException(`Funcionario com ID ${id} não encontrado`);
    }

    funcionarios.splice(id, 1);
    this.writeFuncionarios(updatedFuncionarios);
  }


  } */
}
