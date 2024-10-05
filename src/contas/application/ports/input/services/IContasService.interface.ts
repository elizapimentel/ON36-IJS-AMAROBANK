import { ContaCorrente } from "../../../../../contas/domain/entities/conta-corrente.entity";
import { ContaPoupanca } from "../../../../../contas/domain/entities/conta-poupanca.entity";
import { Contas } from "../../../../../contas/domain/entities/conta.entity";
import { Funcionario } from "../../../../../funcionarios/domain/entities/funcionario.entity";

export interface IContaService {
  cadastrarContaCorrente(funcionario: Funcionario, conta: ContaCorrente): ContaCorrente;
  cadastrarContaPoupanca(funcionario: Funcionario, conta: ContaPoupanca): ContaPoupanca;
  encontrarConta(numeroConta: string): Contas | undefined;
  encerrarConta(numeroConta: string, funcionario: Funcionario): void;
  sacar(numeroConta: string, valor: number): void;
  depositar(numConta: string, valor: number): void;
  transferir(valor: number, contaDestino: Contas): void;
  consultarSaldo(numConta: string): number;
  pagarConta(valor: number): void;
}
