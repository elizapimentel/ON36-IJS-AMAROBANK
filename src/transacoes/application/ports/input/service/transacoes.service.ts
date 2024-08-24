import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Transacao } from '../entities/transacao.entity';
import { TransacoesRepository } from '../repository/transacoes.repository';
import { CriarTransactionDto } from '../dto/create-transaction.dto';
import { TransacoesFactory } from '../../factories/transacoes/transacoes.factory';

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
