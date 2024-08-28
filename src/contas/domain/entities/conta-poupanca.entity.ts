import { Transacao } from '../../../transacoes/domain/entities/transacao.entity';
import { Contas } from './conta.entity';

const TAXA_JUROS_MENSAL = 0.5 / 100;

export class ContaPoupanca extends Contas {
  public ultimoCalculoJuros?: Date;
  constructor(
    numeroConta: string,
    saldo: number,
    transacoes: Transacao[],
    public taxaJuros: number = TAXA_JUROS_MENSAL,
    ultimoCalculoJuros?: Date,
  ) {
    super(numeroConta, saldo, transacoes);
    this.taxaJuros = taxaJuros;
    this.ultimoCalculoJuros = ultimoCalculoJuros;
  }

}