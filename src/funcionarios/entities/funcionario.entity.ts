import { TipoCargo } from 'src/common/enums/tipo-.conta.enum';

export class Funcionario {
  constructor(
    public id: number,
    public nomeFuncionario: string,
    public cargo: TipoCargo,
    public telefones: string[],
  ) {}
}
