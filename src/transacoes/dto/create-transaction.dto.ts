import { TipoTransacao } from '../entities/transacao.entity';

export class CriarTransactionDto {
  readonly id: number;
  readonly numConta: number;
  readonly valor: number;
  readonly tipo: TipoTransacao;
}
