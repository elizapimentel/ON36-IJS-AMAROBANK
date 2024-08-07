import { IConta } from 'src/common/interfaces/contaBancaria.interface';
import { Transacao } from 'src/transacoes/entities/transacao.entity';

export class Contas implements IConta {
  constructor(
    public id: number,
    public numeroConta: number,
    public saldo: number,
    public transacoes: Transacao[],
  ) {}

  depositar(valor: number): void {}
  sacar(valor: number): void {}
  transferir(valor: number, contaDestino: Contas): void {}
  consultarSaldo(): number {
    return this.saldo;
  }
  pagarConta(valor: number): void {}
}
