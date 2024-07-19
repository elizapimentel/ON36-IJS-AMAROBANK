import { Funcionario } from './Funcionario';

export class Stakeholders {
    private nome: string;
    private tipo: string;
    private contribuicao: number;

    constructor(nome: string, tipo: string, contribuicao: number) {
        this.nome = nome;
        this.tipo = tipo;
        this.contribuicao = contribuicao;
    }

    public registrarContribuicao(token: Funcionario): void {}
}
