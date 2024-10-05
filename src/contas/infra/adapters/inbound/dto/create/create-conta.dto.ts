import { Transacao } from "../../../../../../transacoes/domain/entities/transacao.entity";


export class CreateContaDto {
  readonly id?: string;
  readonly numeroConta: string;
  readonly saldo: number;
  readonly transacoes: Transacao[];
}
