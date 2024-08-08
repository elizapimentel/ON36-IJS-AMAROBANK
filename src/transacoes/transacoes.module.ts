import { forwardRef, Module } from '@nestjs/common';
import { TransacoesController } from './controller/transacoes.controller';
import { TransacoesService } from './service/transacoes.service';
import { ContasModule } from 'src/contas/contas.module';

@Module({
  imports: [forwardRef(() =>ContasModule)],
  controllers: [TransacoesController],
  providers: [TransacoesService],
  exports: [TransacoesService],
})
export class TransacoesModule {}
