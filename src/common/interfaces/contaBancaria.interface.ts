import { Contas } from 'src/contas/entities/conta.entity';

export interface IConta {
  depositar(valor: number): void;
  sacar(valor: number): void;
  transferir(valor: number, contaDestino: Contas): void;
  consultarSaldo(): number;
  pagarConta(valor: number): void;
}
