import { Cliente } from '../../../clientes/domain/models/cliente';
import { TipoCargo } from '../../../common/enums/tipo-.banco.enum';
import { Funcionario } from './funcionario';


export class Gerente extends Funcionario {
  clientes: Cliente[];

  constructor(
    cargo: TipoCargo,
    nomeCompleto: string,
    endereco: string,
    telefones: string[],
    clientes: Cliente[] = []
  ) {
    super(cargo, nomeCompleto, endereco, telefones);
    this.clientes = clientes;
  }
}
