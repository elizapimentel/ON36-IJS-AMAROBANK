import { IsEnum } from 'class-validator';
import { TipoConta } from 'src/common/enums/tipo-.conta.enum';
import { Transacao } from 'src/transacoes/entities/transacao.entity';

export class CreateContaDto {
  readonly id: number;
  readonly numeroConta: number;
  readonly saldo: number;
  @IsEnum(TipoConta)
  readonly conta: TipoConta;
  readonly transacoes: Transacao[];
}
