import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientesService } from '../service/clientes.service';
import { CreateClienteDto } from '../dto/create-cliente.dto';
import { UpdateClienteDto } from '../dto/update-cliente.dto';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { TipoCargo } from 'src/common/enums/tipo-.conta.enum';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Post()
  create(@Body() createClienteDto: CreateClienteDto) {
    const funcionario: Funcionario = {
      id: 6,
      nomeFuncionario: 'Joao Correa',
      cargo: TipoCargo.GERENTE,
      telefones: ['123456789'],
    };
    return this.clientesService.cadastrarCliente(funcionario, createClienteDto);
  }

  @Get()
  findAll() {
    return this.clientesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientesService.findById(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.atualizarCliente(+id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientesService.removerCliente(+id);
  }

  @Get(':id/contas')
  findContas(@Param('id') id: string) {
    return this.clientesService.mostrarContasCliente(+id);
  }
}
