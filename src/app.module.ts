import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContasModule } from './contas/contas.module';
import { TransacoesModule } from './transacoes/transacoes.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { ClientesModule } from './clientes/clientes.module';
import { CnpjModule } from './cnpj/cnpj.module';

@Module({
  imports: [ClientesModule, FuncionariosModule, ContasModule, TransacoesModule, CnpjModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
