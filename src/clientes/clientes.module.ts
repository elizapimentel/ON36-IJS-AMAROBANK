import { Module } from '@nestjs/common';
import { ClientesService } from './service/clientes.service';
import { ClientesController } from './controller/clientes.controller';
import { Contas } from '../contas/entities/conta.entity';
import { Gerente } from '../funcionarios/entities/gerente.entity';
import { ClientesRepository } from './repository/clientes.repository';
import { FuncionariosRepository } from '../funcionarios/repository/funcionario.repository';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService, ClientesRepository, FuncionariosRepository],
  exports: [ClientesService],
  imports: [Gerente, Contas],
})
export class ClientesModule {}
