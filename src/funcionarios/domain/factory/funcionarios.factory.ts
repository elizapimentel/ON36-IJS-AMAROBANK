import { Injectable } from '@nestjs/common';
import { TipoCargo } from '../../../common/enums/tipo-.banco.enum';
import { CreateFuncionarioDto } from '../../../funcionarios/infra/adapters/inbound/dto/create-funcionario.dto';
import { Agente } from '../entities/agente.entity';
import { Funcionario } from '../entities/funcionario.entity';
import { Gerente } from '../entities/gerente.entity';



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
