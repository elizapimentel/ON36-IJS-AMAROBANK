import { TipoTransacao } from "../../common/enums/tipo-.banco.enum";

export class Transacao {
  constructor(
    public id: string,
    public numConta: string,
    public valor: number,
    public tipo: TipoTransacao,
    public data: Date,
  ) {}
}
