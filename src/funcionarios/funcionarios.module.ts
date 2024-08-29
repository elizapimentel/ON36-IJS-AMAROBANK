import { Module } from '@nestjs/common';
import { FuncionariosController } from './infra/adapters/inbound/controller/funcionarios.controller';
import { FuncionariosService } from './service/funcionarios.service';
import { ClientesModule } from '../clientes/clientes.module';
import { FuncionariosRepository } from './repository/funcionario.repository';
import { FuncionariosFactory } from '../factories/funcionarios/funcionarios.factory';

@Module({
  imports: [ClientesModule],
  controllers: [FuncionariosController],
  providers: [FuncionariosService, FuncionariosFactory, FuncionariosRepository],
  exports: [FuncionariosService],
})
export class FuncionariosModule { }
