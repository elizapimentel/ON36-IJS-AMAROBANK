import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { TransacoesService } from '../../../../../transacoes/application/ports/input/service/transacoes.service';
import { Transacao } from '../../../../../transacoes/domain/entities/transacao.entity';


@Controller('transacoes')
export class TransacoesController {
  constructor(private readonly transacoesService: TransacoesService) { }

  @Get(':numConta')
  getTransacoesPorConta(@Param('numConta') numConta: string): Transacao[] {
    const transacoes = this.transacoesService.mostrarTransacoesPorConta(numConta);
    return transacoes;
  }
}
