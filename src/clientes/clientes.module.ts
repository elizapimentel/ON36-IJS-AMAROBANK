import { Module } from '@nestjs/common';
import { ClientesRepository } from './infra/adapters/outbound/repository/clientes.repository';
import { Contas } from '../contas/domain/models/conta';
import { Gerente } from '../funcionarios/domain/models/gerente.entity
import { FuncionariosRepository } from '../funcionarios/infra/adapters/outbound/repository/funcionario.repository';
import { ClientesService } from './application/input/clientes.service';
import { ClientesController } from './infra/adapters/inbound/controller/clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './domain/models/cliente';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService, ClientesRepository, FuncionariosRepository],
  exports: [ClientesService],
  imports: [
    TypeOrmModule.forFeature([Cliente, Contas, Gerente])
  ],
})
export class ClientesModule { }
