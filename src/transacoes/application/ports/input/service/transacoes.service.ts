import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Transacao } from '../../../../../transacoes/domain/entities/transacao.entity';
import { TransacoesFactory } from '../../../../../transacoes/domain/factory/transacoes.factory';
import { CriarTransactionDto } from '../../../../../transacoes/infra/adapters/inbound/dto/create-transaction.dto';
import { TransacoesRepository } from '../../../../../transacoes/infra/adapters/outbound/repository/transacoes.repository';


@Injectable()
export class TransacoesService {

  constructor(
    private transacoesRepo: TransacoesRepository,
    private transacoesFactory: TransacoesFactory,
    ) { }

  criarTransacao(transacao: CriarTransactionDto): Transacao {
    const novaTransacao = this.transacoesFactory.criarTransacao(transacao);
    return this.transacoesRepo.cadastrarTransacao(novaTransacao);
  }

  mostrarTransacoesPorConta(numConta: string): Transacao[] {
    const transacoes = this.transacoesRepo.listarTransacoesPorConta(numConta.trim());
    if (!transacoes || transacoes.length === 0) {
      throw new NotFoundException(
        `Nenhuma transação encontrada para a conta ${numConta}`,
      );
    }
    return transacoes;
  }

}
