import { Conta } from './Conta';
import { Moeda } from './Moeda';

export class ContaPoupanca extends Conta {
    private taxaJuros: number;

    constructor(saldo: number, tipoConta: string, moeda: Moeda, taxaJuros: number) {
        super(saldo, tipoConta, moeda);
        this.taxaJuros = taxaJuros;
    }

    public getTaxaJuros(): number {
        return this.taxaJuros;
    }

    protected getLimiteCheque(): number {
        throw new Error('Conta poupança não possui limite de cheque especial.');
    }
}
