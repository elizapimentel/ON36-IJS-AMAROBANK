import { forwardRef, Module } from '@nestjs/common';
import { ContasService } from './services/contas.service';
import { ContasController } from './controller/contas.controller';
import { TransacoesModule } from '../transacoes/transacoes.module';
import { TransacoesRepository } from '../transacoes/repository/transacoes.repository';
import { ContasRepository } from './repository/contas.repository';
import { TransacoesFactory } from '../factories/transacoes/transacoes.factory';
import { ContasFactory } from '../factories/contas/contas.factory';

@Module({
  imports: [forwardRef(() => TransacoesModule)],
  controllers: [ContasController],
  providers: [ContasService, ContasRepository, TransacoesRepository, ContasFactory, TransacoesFactory],
  exports: [ContasService],
})
export class ContasModule { }
