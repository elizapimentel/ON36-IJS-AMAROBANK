import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { FuncionariosService } from '../service/funcionarios.service';
import { CreateFuncionarioDto } from '../dto/create-funcionario.dto';
import { Funcionario } from '../entities/funcionario.entity';
import { UpdateFuncionarioDto } from '../dto/update-funcionario.dto';

@Controller('funcionarios')
export class FuncionariosController {
  constructor(private readonly funcionarioService: FuncionariosService) {}

  @Post()
  cadastrarFuncionario(
    @Body() createFuncionarioDto: CreateFuncionarioDto,
  ): Funcionario {
    return this.funcionarioService.cadastrarFuncionario(createFuncionarioDto);
  }

  @Get()
  findAll(): Funcionario[] {
    return this.funcionarioService.findAll();
  }

  @Patch(':id')
  atualizarFuncionario(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFuncionarioDto: UpdateFuncionarioDto,
  ) {
    return this.funcionarioService.atualizarDadosFuncionario(
      +id,
      updateFuncionarioDto,
    );
  }

  @Delete(':id')
  removerFuncionario(@Param('id', ParseIntPipe) id: number) {
    return this.funcionarioService.removerFuncionario(+id);
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Funcionario {
    return this.funcionarioService.findById(+id);
  }
}
