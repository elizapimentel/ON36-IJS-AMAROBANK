import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { ClienteEntity } from '../../../../../clientes/infra/adapters/entities/cliente.entity'; 
import { IClienteService } from '../../../../../clientes/application/input/IClienteService.interface';
import { UUID } from 'crypto';

@Controller('clientes')
export class ClientesController {
  constructor(
    @Inject(IClienteService) 
    private readonly clientesService: IClienteService,
  ) { }

  @Get(':id')
  findOne(@Param('id') id: UUID): Promise<ClienteEntity> {
    return this.clientesService.encontrarPorId(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: UUID,
    @Body() updateClienteDto: UpdateClienteDto
  ): Promise<ClienteEntity> {
    return this.clientesService.atualizarCliente(id, updateClienteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: UUID): Promise<void> {
    await this.clientesService.removerCliente(id);
  }
}
