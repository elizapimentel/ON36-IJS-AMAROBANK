import { Module } from '@nestjs/common';
import { Contas } from '../contas/entities/conta.entity';
import { Gerente } from '../funcionarios/entities/gerente.entity';
import { FuncionariosRepository } from '../funcionarios/repository/funcionario.repository';
import { ClientesController } from './infra/adapters/inbound/controller/clientes.controller';
import { ClientesService } from './application/service/clientes.service';
import { ClientesRepository } from './infra/adapters/outbound/repository/clientes.repository';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService, ClientesRepository, FuncionariosRepository],
  exports: [ClientesService],
  imports: [Gerente, Contas],
})
export class ClientesModule { }
