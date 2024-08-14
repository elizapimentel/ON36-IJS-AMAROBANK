import { forwardRef, Module } from '@nestjs/common';
import { TransacoesController } from './controller/transacoes.controller';
import { TransacoesService } from './service/transacoes.service';
import { ContasModule } from 'src/contas/contas.module';
import { TransacoesFactory } from '../factories/transacoes.factory';
import { TransacoesRepository } from './repository/transacoes.repository';

@Module({
  imports: [forwardRef(() => ContasModule)],
  controllers: [TransacoesController],
  providers: [TransacoesService, TransacoesFactory, TransacoesRepository],
  exports: [TransacoesService],
})
export class TransacoesModule { }
