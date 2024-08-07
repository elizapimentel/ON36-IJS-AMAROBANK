import { forwardRef, Module } from '@nestjs/common';
import { ContasService } from './services/contas.service';
import { ContasController } from './controller/contas.controller';
import { TransacoesModule } from 'src/transacoes/transacoes.module';

@Module({
  imports: [forwardRef(() =>TransacoesModule)],
  controllers: [ContasController],
  providers: [ContasService],
  exports: [ContasService],
})
export class ContasModule {}
