import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContasService } from './contas.service';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import {
  Funcionario,
  TipoCargo,
} from 'src/funcionarios/entities/funcionario.entity';

@Controller('contas')
export class ContasController {
  constructor(private readonly contasService: ContasService) {}

  @Post()
  criarConta(@Body() createContaDto: CreateContaDto) {
    const funcionario: Funcionario = {
      id: 6,
      nomeFuncionario: 'Nome',
      cargo: TipoCargo.AGENTE,
      telefones: ['123456789'],
    };
    return this.contasService.criarConta(funcionario, createContaDto);
  }

  @Get()
  findAll() {
    return this.contasService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.contasService.findById(+id);
  }

  @Patch(':id')
  atualizarConta(
    @Param('id') id: string,
    @Body() updateContaDto: UpdateContaDto,
  ) {
    return this.contasService.atualizarConta(+id, updateContaDto);
  }

  @Delete(':id')
  removerConta(@Param('id') id: string) {
    return this.contasService.removerConta(+id);
  }
}
