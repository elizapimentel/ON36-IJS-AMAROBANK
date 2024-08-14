import { Funcionario } from '../../funcionarios/entities/funcionario.entity';
import { ContaCorrente } from '../entities/conta-corrente.entity';
import { ContaPoupanca } from '../entities/conta-poupanca.entity';
import { Contas } from '../entities/conta.entity';

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
