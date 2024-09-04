import { Injectable } from '@nestjs/common';
import { TipoCargo } from '../../../common/enums/tipo-.banco.enum';
import { CreateFuncionarioDto } from '../../../funcionarios/infra/adapters/inbound/dto/create-funcionario.dto';
import { AgenteEntity } from 'src/funcionarios/infra/adapters/entities/agente.entity';
import { FuncionarioEntity } from 'src/funcionarios/infra/adapters/entities/funcionario.entity';
import { GerenteEntity } from 'src/funcionarios/infra/adapters/entities/gerente.entity';



@Injectable()
export class FuncionariosFactory {
  criarFuncionario(
    cargo: TipoCargo,
    funcionario: CreateFuncionarioDto,
  ): FuncionarioEntity {
    switch (cargo) {
      case TipoCargo.AGENTE:
        return new AgenteEntity({
          nomeCompleto: funcionario.nomeCompleto,
          endereco: funcionario.endereco,
          telefones: funcionario.telefones,
        });
      case TipoCargo.GERENTE:
        return new GerenteEntity({
          nomeCompleto: funcionario.nomeCompleto,
          endereco: funcionario.endereco,
          telefones: funcionario.telefones,
          clientes: funcionario.clientes || [],
        });
      default:
        throw new Error('Cargo inválido');
    }
  }
}
