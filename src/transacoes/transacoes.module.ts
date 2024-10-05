import { forwardRef, Module } from '@nestjs/common';
import { TransacoesController } from './infra/adapters/inbound/controller/transacoes.controller';
import { ContasModule } from '../contas/contas.module';
import { TransacoesService } from './application/ports/input/service/transacoes.service';
import { TransacoesFactory } from './domain/factory/transacoes.factory';
import { TransacoesRepository } from './infra/adapters/outbound/repository/transacoes.repository';


@Module({
  imports: [forwardRef(() => ContasModule)],
  controllers: [TransacoesController],
  providers: [TransacoesService, TransacoesFactory, TransacoesRepository],
  exports: [TransacoesService],
})
export class TransacoesModule { }
