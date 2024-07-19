import { Conta } from './Conta';
import { Moeda } from './Moeda';

export class ContaCorrente extends Conta {
    private limiteCheque: number;

    constructor(saldo: number, tipoConta: string, moeda: Moeda, limiteCheque: number) {
        super(saldo, tipoConta, moeda);
        this.limiteCheque = limiteCheque;
    }

    public getLimiteCheque(): number {
        return this.limiteCheque;
    }

    protected getTaxaJuros(): number {
        throw new Error('Conta corrente não possui taxa de juros.');
    }
}
