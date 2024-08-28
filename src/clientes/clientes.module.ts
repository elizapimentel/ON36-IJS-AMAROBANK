import { Module } from '@nestjs/common';
import { ClientesRepository } from './infra/adapters/outbound/repository/clientes.repository';
import { Contas } from '../contas/domain/entities/conta.entity';
import { Gerente } from '../funcionarios/domain/entities/gerente.entity';
import { FuncionariosRepository } from '../funcionarios/infra/adapters/outbound/repository/funcionario.repository';
import { ClientesService } from './application/input/clientes.service';
import { ClientesController } from './infra/adapters/inbound/controller/clientes.controller';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService, ClientesRepository, FuncionariosRepository],
  exports: [ClientesService],
  imports: [Gerente, Contas],
})
export class ClientesModule { }
