import { ClienteEntity } from "../../../../../clientes/infra/adapters/entities/cliente.entity";
import { TipoCargo } from "../../../../../common/enums/tipo-.banco.enum";


export class CreateFuncionarioDto {
  cargo?: TipoCargo;
  nomeCompleto: string;
  endereco: string;
  telefones: string[];
  clientes?: ClienteEntity[];
}
