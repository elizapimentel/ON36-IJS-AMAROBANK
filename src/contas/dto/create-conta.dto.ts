import { Transacao } from 'src/transacoes/entities/transacao.entity';
import { tipoConta } from '../entities/conta.entity';

export class CreateContaDto {
  readonly id: number;
  readonly numeroConta: number;
  readonly saldo: number;
  readonly tipoConta: tipoConta;
  readonly transacoes: Transacao[];
  // moeda
}
