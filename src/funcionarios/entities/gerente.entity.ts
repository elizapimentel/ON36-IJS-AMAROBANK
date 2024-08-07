import { Funcionario, TipoCargo } from './funcionario.entity';
import { Cliente } from '../../clientes/entities/cliente.entity';

export class Gerente extends Funcionario {
  constructor(
    public gerenteId: number,
    public nomeFuncionario: string,
    public cargo: TipoCargo,
    public telefones: string[],
    public clientes: Cliente[],
  ) {
    super(gerenteId, nomeFuncionario, TipoCargo.GERENTE, telefones);
    this.clientes = clientes;
  }
}
