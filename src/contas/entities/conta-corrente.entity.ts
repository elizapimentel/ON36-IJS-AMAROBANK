import { Transacao } from "src/transacoes/entities/transacao.entity";
import { Contas } from "./conta.entity";


export class ContaCorrente extends Contas {
  constructor(
    id: number,
    numeroConta: number,
    saldo: number,
    transacoes: Transacao[],
    public limiteChequeEspecial: number,
  ) {
    super(id, numeroConta, saldo, transacoes);
  }
}
