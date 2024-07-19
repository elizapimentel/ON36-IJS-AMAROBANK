import { Funcionario } from './Funcionario';

export class PrestadorServico {
    private nome: string;
    private servico: string;
    private contato: string;

    constructor(nome: string, servico: string, contato: string) {
        this.nome = nome;
        this.servico = servico;
        this.contato = contato;
    }

    public registrarServico(token: Funcionario): void {}
}
