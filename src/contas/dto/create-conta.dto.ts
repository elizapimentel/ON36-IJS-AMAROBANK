import { Transacao } from "src/transacoes/entities/transacao.entity";

export class CreateContaDto {
    readonly id: number;
    readonly numeroConta: number;
    readonly saldo: number; 
    readonly tipoConta: string;
    readonly transacoes: Transacao[];
    // moeda
}
