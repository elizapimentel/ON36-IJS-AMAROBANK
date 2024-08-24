import { Transacao } from '../../../transacoes/entities/transacao.entity';

export class CreateContaDto {
  readonly id?: string;
  readonly numeroConta: string;
  readonly saldo: number;
  readonly transacoes: Transacao[];
}
