import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ContasService } from 'src/contas/services/contas.service';
import { Transacao } from '../entities/transacao.entity';
import { TipoTransacao } from 'src/common/enums/tipo-.conta.enum';

@Injectable()
export class TransacoesService {
  private readonly filePath = path.resolve('src/transacoes/transacoes.json');
  private idCounter: number;

  constructor(
    @Inject(forwardRef(() => ContasService))
    private readonly contasService: ContasService,
  ) {
    const transacoes = this.readTransacoes();
    this.idCounter =
      transacoes.length > 0 ? transacoes[transacoes.length - 1].id + 1 : 1;
  }

  private readTransacoes(): Transacao[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Transacao[];
  }

  private writeTransacoes(transactions: Transacao[]): void {
    fs.writeFileSync(
      this.filePath,
      JSON.stringify(transactions, null, 2),
      'utf8',
    );
  }

  criarTransacao(
    numConta: number,
    valor: number,
    tipo: TipoTransacao,
  ): Transacao {
    const conta = this.contasService.findById(numConta);
    if (!conta) {
      throw new NotFoundException('Conta não encontrada');
    }

    const novaTransacao = new Transacao(
      this.idCounter++,
      numConta,
      valor,
      tipo,
      new Date(),
    );

    const transacoes = this.readTransacoes();
    transacoes.push(novaTransacao);
    this.writeTransacoes(transacoes);
    return novaTransacao;
  }

  mostrartransacoesPorConta(numConta:number): Transacao[] {
    const transacoes = this.readTransacoes();
    return transacoes.filter((transacao) => transacao.numConta === numConta);
  }
}
