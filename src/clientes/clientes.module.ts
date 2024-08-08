import { Module } from '@nestjs/common';
import { ClientesService } from './service/clientes.service';
import { ClientesController } from './controller/clientes.controller';
import { Contas } from 'src/contas/entities/conta.entity';
import { Gerente } from 'src/funcionarios/entities/gerente.entity';

@Module({
  controllers: [ClientesController],
  providers: [ClientesService],
  exports: [ClientesService],
  imports: [Contas, Gerente],
})
export class ClientesModule {}
