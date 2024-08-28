import { Transacao } from "../../../transacoes/domain/entities/transacao.entity";
import { ContaCorrente } from "./conta-corrente.entity"; 

export class ContaPJ extends ContaCorrente {
    constructor(
        numeroConta: string,
        saldo: number,
        transacoes: Transacao[],
        public limiteChequeEspecial: number,
        public cnpj: string,
    ) {
        super(numeroConta, saldo, transacoes, limiteChequeEspecial);
        this.cnpj = cnpj;
    }
}