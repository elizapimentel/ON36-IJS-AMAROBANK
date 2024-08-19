import { forwardRef, Module } from '@nestjs/common';
import { TransacoesController } from './controller/transacoes.controller';
import { TransacoesService } from './service/transacoes.service';
import { ContasModule } from '../contas/contas.module';
import { TransacoesFactory } from '../factories/transacoes/transacoes.factory';
import { TransacoesRepository } from './repository/transacoes.repository';

@Module({
  imports: [forwardRef(() => ContasModule)],
  controllers: [TransacoesController],
  providers: [TransacoesService, TransacoesFactory, TransacoesRepository],
  exports: [TransacoesService],
})
export class TransacoesModule { }
