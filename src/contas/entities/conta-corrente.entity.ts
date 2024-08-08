import { Transacao } from "src/transacoes/entities/transacao.entity";
import { Contas } from "./conta.entity";
import { TipoConta } from "src/common/enums/tipo-.conta.enum";


export class ContaCorrente extends Contas {
  constructor(
    id: number,
    numeroConta: number,
    saldo: number,
    transacoes: Transacao[],
    tipoConta: TipoConta.CORRENTE,
    public limiteChequeEspecial: number,
  ) {
    super(id, numeroConta, saldo, transacoes,tipoConta);
  }
}
