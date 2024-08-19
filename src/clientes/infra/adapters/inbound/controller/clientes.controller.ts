import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientesService } from '../../../../application/service/clientes.service';
import { CreateClienteDto } from '../../../../domain/dto/create-cliente.dto';
import { UpdateClienteDto } from '../../../../domain/dto/update-cliente.dto';
import { Gerente } from '../../../../../funcionarios/entities/gerente.entity';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) { }

  @Post()
  create(@Body() cliente: CreateClienteDto, funcionario: Gerente) {
    // const cliente: IPessoa = { ...createClienteDto };
    const novoCliente = this.clientesService.cadastrarCliente(funcionario, cliente);
    return novoCliente;
  }

  @Get()
  findAll() {
    return this.clientesService.listarTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesService.encontrarPorId(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.atualizarCliente(id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientesService.removerCliente(id);
  }
}
