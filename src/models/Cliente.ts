import { Conta } from './Conta';
import { LinhaCredito } from './LinhaCredito';
import { Funcionario } from './Funcionario';
import { Banco } from './Banco';
import { Cadastravel } from '../interfaces/Cadastravel';

export class Cliente implements Cadastravel {
  private id: number;
  private nomeCompleto: string;
  private cpf: string;
  private endereco: string;
  private dataNascimento: Date;
  private telefones: string[];
  private contas: Conta[];
  private listaLinhasCredito: LinhaCredito[];

  private static nextid = 1; // dado que incrementará a cada novo cliente enquanto está sem BD

 constructor(nomeCompleto: string, cpf: string, endereco: string, dataNascimento: Date, telefones: string[]) {
    this.id = Cliente.nextid;
    this.nomeCompleto = nomeCompleto;
    this.cpf = cpf;
    this.endereco = endereco;
    this.dataNascimento = dataNascimento;
    this.telefones = telefones;
    this.contas = [];
    this.listaLinhasCredito = [];
  }

  public getId(): number {
    return this.id;
  }

  public cadastrar(token: Funcionario): void {}

  public consultarDados(token: Funcionario): void {}

  public adicionarConta(conta: Conta, token: Funcionario): void {
    this.contas.push(conta);
  }

  public consultarContas(token: Funcionario): Conta[] {
    return this.contas;
  }

  public consultarHistCredito(token: Funcionario): LinhaCredito[] {
    return this.listaLinhasCredito;
  }

  public solicitarCartao(token: Funcionario): void {}

  public solicitarEmprestimo(valor: number, tipoCredito:string, banco: Banco, token: Funcionario): void {}

  public emitirExtrato(token: Funcionario): string { 
    return ''; 
  }

}
