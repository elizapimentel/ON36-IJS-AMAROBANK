import { TipoCargo } from '../../common/enums/tipo-.banco.enum';
import { Cliente } from '../../clientes/domain/entities/cliente.entity';

export class CreateFuncionarioDto {
  cargo: TipoCargo;
  nomeCompleto: string;
  endereco: string;
  telefones: string[];
  clientes?: Cliente[];
}
