import { Transacao } from "../../transacoes/entities/transacao.entity";
import { Contas } from "./conta.entity";


export class ContaCorrente extends Contas {
  constructor(
    numeroConta: string,
    saldo: number,
    transacoes: Transacao[],
    public limiteChequeEspecial: number,
  ) {
    super(numeroConta, saldo, transacoes);
    this.limiteChequeEspecial = limiteChequeEspecial;
  }
}
