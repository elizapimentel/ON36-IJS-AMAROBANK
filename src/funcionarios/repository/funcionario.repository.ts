import { Injectable } from '@nestjs/common';
import { randomUUID as uuid } from 'crypto';
import { Funcionario } from '../entities/funcionario.entity';
import { Gerente } from '../entities/gerente.entity';
import { Agente } from '../entities/agente.entity';

@Injectable()
export class FuncionariosRepository {
  funcionarios: Funcionario[] = [];

  constructor() { }

  cadastrarFuncionario(funcionario: Funcionario): Funcionario {
    funcionario.id = uuid();
    this.funcionarios.push(funcionario);
    return funcionario;
  }

  listarTodos(): Funcionario[] {
    return this.funcionarios;
  }

  buscarGerentePorId(id: string): Gerente | undefined {
    const funcionario = this.funcionarios.find(funcionario => funcionario.id === id);
    if (funcionario instanceof Gerente) {
      return funcionario;
    }
    return undefined;
  }

  buscarFuncionarioPorId(id: string): Funcionario | undefined {
    const funcionario = this.funcionarios.find(funcionario => funcionario.id === id);
    return funcionario;
  }



}
