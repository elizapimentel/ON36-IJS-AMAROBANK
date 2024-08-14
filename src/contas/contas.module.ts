import { forwardRef, Module } from '@nestjs/common';
import { ContasService } from './services/contas.service';
import { ContasController } from './controller/contas.controller';
import { TransacoesModule } from '../transacoes/transacoes.module';
import { TransacoesRepository } from '../transacoes/repository/transacoes.repository';
import { ContasFactory } from '../factories/contas.factory';
import { TransacoesFactory } from '../factories/transacoes.factory';
import { ContasRepository } from './repository/contas.repository';

@Module({
  imports: [forwardRef(() => TransacoesModule)],
  controllers: [ContasController],
  providers: [ContasService, ContasRepository, TransacoesRepository, ContasFactory, TransacoesFactory],
  exports: [ContasService],
})
export class ContasModule { }
