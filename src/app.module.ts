import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContasModule } from './contas/contas.module';
import { TransacoesModule } from './transacoes/transacoes.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [ClientesModule, ContasModule, FuncionariosModule, TransacoesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
