import { TipoCargo } from 'src/common/enums/tipo-.conta.enum';
import { Funcionario } from './funcionario.entity';

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
