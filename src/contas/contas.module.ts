import { forwardRef, Module } from '@nestjs/common';
import { ContasController } from './infra/adapters/inbound/controller/contas.controller';
import { TransacoesModule } from '../transacoes/transacoes.module';
import { TransacoesRepository } from '../transacoes/infra/adapters/outbound/repository/transacoes.repository';
import { ContasService } from './application/ports/input/services/contas.service';
import { ContasFactory } from './domain/factory/contas.factory';
import { ContasRepository } from './infra/adapters/outbound/repository/contas.repository';
import { TransacoesFactory } from '../transacoes/domain/factory/transacoes.factory';


@Module({
  imports: [forwardRef(() => TransacoesModule)],
  controllers: [ContasController],
  providers: [ContasService, ContasRepository, TransacoesRepository, ContasFactory, TransacoesFactory],
  exports: [ContasService],
})
export class ContasModule { }
