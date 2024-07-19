import { Funcionario } from './Funcionario';

export class FundoSolidario {
    totalCaptado: number;
    contato: string;

    constructor() {
        this.totalCaptado = 0;
        this.contato = '';
    }

    adicionarDoacao(valor: number, token: Funcionario): void {}
    consultarFundo(token: Funcionario): number { return this.totalCaptado; }
}
