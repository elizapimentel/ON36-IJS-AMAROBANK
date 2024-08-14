import { TipoConta } from '../../common/enums/tipo-.banco.enum';
import { Transacao } from '../../transacoes/entities/transacao.entity';

export class Contas {
    id?: string;
  constructor(
    public numeroConta: string,
    public saldo: number,
    public transacoes: Transacao[],
    public tipoConta?: TipoConta,
    public limiteChequeEspecial?: number,
    public taxaJuros?: number,
  ) {}
}
