import { Funcionario, TipoCargo } from './funcionario.entity';

export class Agente extends Funcionario {
  constructor(
    public agenteId: number,
    public nomeFuncionario: string,
    public cargo: TipoCargo,
    public telefones: string[],
  ) {
    super(agenteId, nomeFuncionario, TipoCargo.AGENTE, telefones);
  }
}
