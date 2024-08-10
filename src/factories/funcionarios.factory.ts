import { Injectable } from '@nestjs/common';
// import { Cliente } from '../clientes/entities/cliente.entity';
import { TipoCargo } from '../common/enums/tipo-.banco.enum';
import { Agente } from '../funcionarios/entities/agente.entity';
import { Funcionario } from '../funcionarios/entities/funcionario.entity';
import { Gerente } from '../funcionarios/entities/gerente.entity';
import { CreateFuncionarioDto } from '../funcionarios/dto/create-funcionario.dto';

@Injectable()
export class FuncionariosFactory {
  criarFuncionario(
    cargo: TipoCargo,
    funcionario: CreateFuncionarioDto,
  ): Funcionario {
    switch (cargo) {
      case TipoCargo.AGENTE:
        return new Agente(
          funcionario.cargo,
          funcionario.nomeCompleto,
          funcionario.endereco,
          funcionario.telefones,
        );
      case TipoCargo.GERENTE:
        return new Gerente(
          funcionario.cargo,
          funcionario.nomeCompleto,
          funcionario.endereco,
          funcionario.telefones,
          funcionario.clientes || [],
        );
      default:
        throw new Error('Cargo inválido');
    }
  }
}
