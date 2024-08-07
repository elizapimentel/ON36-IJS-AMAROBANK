import { Transacao } from 'src/transacoes/entities/transacao.entity';
import { Contas } from './conta.entity';

const TAXA_JUROS_MENSAL = 0.5 / 100;

export class ContaPoupanca extends Contas {
  public ultimoCalculoJuros?: Date;
  constructor(
    id: number,
    numeroConta: number,
    saldo: number,
    transacoes: Transacao[],
    public taxaJuros: number = TAXA_JUROS_MENSAL,
    ultimoCalculoJuros?: Date,
  ) {
    super(id, numeroConta, saldo, transacoes);
    this.ultimoCalculoJuros = ultimoCalculoJuros;
  }
}
