import { TipoTransacao } from "src/common/enums/tipo-.conta.enum";

export class Transacao {
  constructor(
    public id: number,
    public numConta: number,
    public valor: number,
    public tipo: TipoTransacao,
    public data: Date,
  ) {}
}
