import { TipoCargo } from '../../common/enums/tipo-.banco.enum';
import { Cliente } from '../../clientes/entities/cliente.entity';

export class CreateFuncionarioDto {
  readonly cargo: TipoCargo;
  readonly nomeCompleto: string;
  readonly endereco: string;
  readonly telefones: string[];
  readonly clientes?: Cliente[];
}
