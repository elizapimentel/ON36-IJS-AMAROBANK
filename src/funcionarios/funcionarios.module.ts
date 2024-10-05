import { Module } from '@nestjs/common';
import { FuncionariosController } from './infra/adapters/inbound/controller/funcionarios.controller';
import { ClientesModule } from '../clientes/clientes.module';
import { FuncionariosService } from './application/ports/input/service/funcionarios.service';
import { FuncionariosFactory } from './domain/factory/funcionarios.factory';
import { FuncionariosRepository } from './infra/adapters/outbound/repository/funcionario.repository';
import { GerenteRepository } from './infra/adapters/outbound/repository/gerente.repository';
import { GerenteService } from './application/ports/input/service/gerente.service';
import { IFuncionarioService } from './application/ports/input/service/IFuncionario.service';
import { IGerenteService } from './application/ports/input/service/IGerente.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GerenteEntity } from './infra/adapters/entities/gerente.entity';
import { FuncionarioEntity } from './infra/adapters/entities/funcionario.entity';
import { AgenteEntity } from './infra/adapters/entities/agente.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([GerenteEntity, FuncionarioEntity, AgenteEntity]),
    ClientesModule
  ],
  controllers: [FuncionariosController],
  providers: [
    {
      provide: IFuncionarioService,
      useClass: FuncionariosService,
    },
    {
      provide: IGerenteService,
      useClass: GerenteService,
    },

    FuncionariosFactory,
    FuncionariosRepository,
    GerenteRepository
  ],
  exports: [IFuncionarioService],
})
export class FuncionariosModule { }
