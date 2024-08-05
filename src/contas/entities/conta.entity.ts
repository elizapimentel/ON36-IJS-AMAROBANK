import { Transacao } from 'src/transacoes/entities/transacao.entity';

export enum tipoConta {
  CORRENTE = 'corrente',
  POUPANÇA = 'poupança',
}

export class Conta {
  constructor(
    public id: number,
    public numeroConta: number,
    public saldo: number,
    public tipoConta: tipoConta,
    public transacoes: Transacao[],
  ) {}
}
