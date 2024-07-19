import { Funcionario } from "../models/Funcionario";

export interface Cadastravel {
    cadastrar(token: Funcionario): void;
    consultarDados(token: Funcionario): void;
}