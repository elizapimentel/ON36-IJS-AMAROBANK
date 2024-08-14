import { TipoTransacao } from '../../common/enums/tipo-.banco.enum';

export class CriarTransactionDto {
  readonly id: string;
  readonly numConta: string;
  readonly valor: number;
  readonly tipo: TipoTransacao;
  readonly data: Date;

}
