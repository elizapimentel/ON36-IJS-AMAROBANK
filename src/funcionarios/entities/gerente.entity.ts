import { Funcionario } from './funcionario.entity';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { TipoCargo } from '../../common/enums/tipo-.banco.enum';

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
