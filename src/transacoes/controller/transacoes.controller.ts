import {
  Controller,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { TransacoesService } from '../service/transacoes.service';
import { Transacao } from '../entities/transacao.entity';

@Controller('transacoes')
export class TransacoesController {
  constructor(private readonly transacoesService: TransacoesService) {}

  @Get(':numConta')
  getTransacoesPorConta(@Param('numConta') numConta: number): Transacao[] {
    const transacoes =
      this.transacoesService.mostrartransacoesPorConta(numConta);
    if (transacoes.length === 0) {
      throw new NotFoundException(
        `Nenhuma transação encontrada para a conta com ID ${numConta}`,
      );
    }
    return transacoes;
  }
}
