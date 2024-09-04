import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { ContasModule } from './contas/contas.module';
// import { TransacoesModule } from './transacoes/transacoes.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { ClientesModule } from './clientes/clientes.module';
import { CnpjModule } from './cnpj/cnpj.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options, 
      autoLoadEntities: true,
    }), ClientesModule, FuncionariosModule, CnpjModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
