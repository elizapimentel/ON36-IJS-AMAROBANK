import { Module } from '@nestjs/common';
import { ClientesRepository } from './infra/adapters/outbound/repository/clientes.repository';
import { ClientesService } from './application/input/clientes.service';
import { ClientesController } from './infra/adapters/inbound/controller/clientes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IClienteService } from './application/input/IClienteService.interface';
import { ClienteEntity } from './infra/adapters/entities/cliente.entity';
import { ContaEntity } from '../contas/infra/adapters/entities/conta.entity';
import { GerenteEntity } from '../funcionarios/infra/adapters/entities/gerente.entity';

@Module({
  controllers: [ClientesController],
  providers: [
    {
      provide: IClienteService,
      useClass: ClientesService,
    },
    ClientesRepository,
  ],
  exports: [IClienteService, ClientesRepository],
  imports: [
    TypeOrmModule.forFeature([ClienteEntity, ContaEntity, GerenteEntity])
  ],
})
export class ClientesModule { }
