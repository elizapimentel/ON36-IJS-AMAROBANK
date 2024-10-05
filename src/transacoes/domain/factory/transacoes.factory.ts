import { Injectable } from '@nestjs/common';
import { CriarTransactionDto } from '../../../transacoes/infra/adapters/inbound/dto/create-transaction.dto';
import { Transacao } from '../entities/transacao.entity';


@Injectable()
export class TransacoesFactory {
    criarTransacao(transacao: CriarTransactionDto): Transacao {
        return new Transacao(
            transacao.id,
            transacao.numConta,
            transacao.valor,
            transacao.tipo,
            new Date(),
        );
    }
}