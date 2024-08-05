import { Cadastravel } from '../interfaces/Cadastravel';

export abstract class Funcionario implements Cadastravel {
    private nomeFuncionario: string;
    private cargo: string;
    private telefones: string[];


    constructor(nomeFuncionario: string, cargo: string, telefones: string[]) {
        this.nomeFuncionario = nomeFuncionario;
        this.cargo = cargo;
        this.telefones = telefones;
    }

    public getNomeFuncionario(): string {
        return this.nomeFuncionario;
    }
    
    public cadastrar(token: Funcionario): void {}

    public consultarDados(token: Funcionario): void {}

    public abstract getId(): number; //pesquisar sobre métodos abstratos

}