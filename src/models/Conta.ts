import { Transacao } from './Transacao';
import { ContaBancaria } from '../interfaces/ContaBancaria';
import { Moeda } from './Moeda';

export abstract class Conta implements ContaBancaria {
  private numeroConta: number;
  private saldo: number; //mudar para BigDecimal
  private tipoConta: string;
  private moeda: Moeda;
  private transacoes: Transacao[];

  private static nextid = 1;

  constructor(saldo: number, tipoConta: string, moeda: Moeda) {
    this.numeroConta = Conta.nextid++;
    this.saldo = saldo;
    this.tipoConta = tipoConta;
    this.moeda = moeda;
    this.transacoes = [];
  }

  public getId(): number {
    return this.numeroConta;
  }

  public getSaldo(): number {
    return this.saldo;
  }

  public depositar(valor: number): void {
    this.saldo += valor;
    this.registrarTransacao('Depósito', valor, this);

  }

  public sacar(valor: number): void {
    if (valor <= this.saldo) {
      this.saldo -= valor;
      this.registrarTransacao('Saque', valor, this);
    } else {
      throw new Error('Saldo insuficiente');
    }
  }
  public transferir(valor: number, contaDestino: Conta): void {
    this.sacar(valor);
    contaDestino.depositar(valor);
    this.registrarTransacao('Transferência', valor, contaDestino);
  }

  public consultarSaldo(): number {
    return this.saldo;
  }
  public pagarConta(valor: number): void { }

  public pagarEmprestimo(valor: number): void { }

  public consultarDados(): void { }

  private registrarTransacao(tipo: string, valor: number, contaDestino: Conta): void {
    const transacao = new Transacao(
      new Date(),
      valor,
      tipo,
      this,
      contaDestino
    );
    this.transacoes.push(transacao);
  }

  // Método a ser implementado nas subclasses
  protected abstract getLimiteCheque(): number;
  protected abstract getTaxaJuros(): number;

}
