import { Module } from '@nestjs/common';
import { FuncionariosController } from './controller/funcionarios.controller';
import { FuncionariosService } from './service/funcionarios.service';
import { ClientesModule } from 'src/clientes/clientes.module';

@Module({
  imports: [ClientesModule],
  controllers: [FuncionariosController],
  providers: [FuncionariosService],
  exports: [FuncionariosService],
})
export class FuncionariosModule {}
