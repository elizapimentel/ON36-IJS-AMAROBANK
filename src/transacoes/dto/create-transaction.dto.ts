import { TipoTransacao } from 'src/common/enums/tipo-.conta.enum';

export class CriarTransactionDto {
  readonly id: number;
  readonly numConta: number;
  readonly valor: number;
  readonly tipo: TipoTransacao;
}
