import { Conta } from './Conta';

export class Transacao {
    private id: number;
    private data: Date;
    private valor: number;
    private tipoTransacao: string;
    private contaOrigem: Conta;
    private contaDestino: Conta;

    private static nextid = 1;

    constructor(data: Date, valor: number, tipoTransacao: string, contaOrigem: Conta, contaDestino: Conta) {
        this.id = Transacao.nextid;
        this.data = data;
        this.valor = valor;
        this.tipoTransacao = tipoTransacao;
        this.contaOrigem = contaOrigem;
        this.contaDestino = contaDestino;
    }

    public getId(): number {
        return this.id;
    }

    public consultarHistorico(): Transacao[] { 
        // Implementar lógica para consultar histórico de transações
        return []; 
    }
}
