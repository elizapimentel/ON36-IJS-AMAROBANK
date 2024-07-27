import { Transacao } from "src/transacoes/entities/transacao.entity";

export class Conta {
    constructor(
        public id: number,
        public numeroConta: number,
        public saldo: number,
        public tipoConta: string,
        public transacoes: Transacao[]
    ){}
}
