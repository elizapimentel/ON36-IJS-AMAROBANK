import { Body, Controller, Post } from '@nestjs/common';
import { TransacoesService } from '../service/transacoes.service';
import { CriarTransactionDto } from '../dto/create-transaction.dto';
import { Transacao } from '../entities/transacao.entity';

@Controller('transacoes')
export class TransacoesController {
  constructor(private readonly transacoesService: TransacoesService) {}

  @Post()
  criarTransacao(@Body() createTransacaoDto: CriarTransactionDto): Transacao {
    const { numConta, valor, tipo } = createTransacaoDto;

    // Adiciona uma transação e verifica se a conta existe
    const transacao = this.transacoesService.criarTransacao(
      numConta,
      valor,
      tipo,
    );

    return transacao;
  }
}
