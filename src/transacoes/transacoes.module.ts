import { Module } from '@nestjs/common';
import { TransacoesController } from './transacoes.controller';
import { TransacoesService } from './transacoes.service';
import { ContasModule } from 'src/contas/contas.module';

@Module({
  imports: [ContasModule],
  controllers: [TransacoesController],
  providers: [TransacoesService],
  exports: [TransacoesService]
})
export class TransacoesModule {}
