export enum TipoTransacao {
  DEBITO = 'debito',
  CREDITO = 'credito',
  DEPOSITO = "DEPOSITO",
  SAQUE = "SAQUE",
  TRANSFERENCIA = "TRANSFERENCIA",
  PAGAMENTO = "PAGAMENTO",
}

export class Transacao {
  constructor(
    public id: number,
    public numConta: number,
    public valor: number,
    public tipo: TipoTransacao,
    public data: Date,
  ) {}
}
