import { Conta } from './Conta';

export class Transacao {
    private data: Date;
    private valor: number;
    private tipoTransacao: string;
    private contaOrigem: Conta;
    private contaDestino: Conta;

    constructor(data: Date, valor: number, tipoTransacao: string, contaOrigem: Conta, contaDestino: Conta) {
        this.data = data;
        this.valor = valor;
        this.tipoTransacao = tipoTransacao;
        this.contaOrigem = contaOrigem;
        this.contaDestino = contaDestino;
    }

    public consultarHistorico(): Transacao[] { 
        // Implementar lógica para consultar histórico de transações
        return []; 
    }
}
