import { Module } from '@nestjs/common';
import { FuncionariosController } from './infra/adapters/inbound/controller/funcionarios.controller';
import { ClientesModule } from '../clientes/clientes.module';
import { FuncionariosService } from './application/ports/input/service/funcionarios.service';
import { FuncionariosFactory } from './domain/factory/funcionarios.factory';
import { FuncionariosRepository } from './infra/adapters/outbound/repository/funcionario.repository';


@Module({
  imports: [ClientesModule],
  controllers: [FuncionariosController],
  providers: [FuncionariosService, FuncionariosFactory, FuncionariosRepository],
  exports: [FuncionariosService],
})
export class FuncionariosModule { }
