import { Injectable } from '@nestjs/common';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { TipoCargo } from 'src/common/enums/tipo-.conta.enum';
import { Agente } from 'src/funcionarios/entities/agente.entity';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { Gerente } from 'src/funcionarios/entities/gerente.entity';

@Injectable()
export class FuncionariosFactory {
  static criarFuncionario(
    cargo: TipoCargo,
    id: number,
    nomeCompleto: string,
    telefones: string[],
    clientes?: Cliente[],
  ): Funcionario {
    switch (cargo) {
      case TipoCargo.AGENTE:
        return new Agente(id, nomeCompleto, cargo, telefones);
      case TipoCargo.GERENTE:
        return new Gerente(id, nomeCompleto, cargo, telefones, clientes);
      default:
        throw new Error('Cargo inválido');
    }
  }
}
