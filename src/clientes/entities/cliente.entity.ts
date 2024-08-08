import { Contas } from 'src/contas/entities/conta.entity';
import { Gerente } from 'src/funcionarios/entities/gerente.entity';

export class Cliente {
  constructor(
    public id: number,
    public nomeCompleto: string,
    public endereco: string,
    public telefones: string[],
    public contas: Contas[],
    public gerente: Gerente,
  ) {}
}
