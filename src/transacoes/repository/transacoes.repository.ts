import { Injectable } from "@nestjs/common";
import { Transacao } from "../entities/transacao.entity";
import { CriarTransactionDto } from "../dto/create-transaction.dto";

@Injectable()
export class TransacoesRepository {
  transacoes: Transacao[] = [];

  constructor() { }

  cadastrarTransacao(transacao: CriarTransactionDto): Transacao {
    this.transacoes.push(transacao);
    return transacao;
  }

  listarTransacoesPorConta(numConta: string): Transacao[] {
    const contaNormalizada = numConta.trim();
    const transacoes = this.transacoes.filter(
      (transacao) => transacao.numConta.trim() === contaNormalizada,
    );
    return transacoes;
  }

}