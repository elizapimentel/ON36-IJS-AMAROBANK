import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { Funcionario, TipoCargo } from './entities/funcionario.entity';
import { FuncionariosService } from './funcionarios.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
// import { FindFuncionariosByCargoDto } from './dto/FindFuncionariosByCargoDto';

@Controller('funcionarios')
export class FuncionariosController {
    constructor(private readonly funcionarioService: FuncionariosService) {}

    @Post()
    cadastrarFuncionario(
        @Body()createFuncionarioDto: CreateFuncionarioDto): 
        Funcionario {
            const { nomeFuncionario, cargo, telefones } = createFuncionarioDto;
            return this.funcionarioService.cadastrarFuncionario(nomeFuncionario, cargo, telefones);
    }

    @Get()
    findAll(): Funcionario[] {
    return this.funcionarioService.findAll();
    }

    @Patch(':id')
    atualizarFuncionario(
      @Param('id', ParseIntPipe) id: number,
      @Body() createFuncionarioDto: CreateFuncionarioDto
    ): Funcionario {
      const { nomeFuncionario, cargo, telefones } = createFuncionarioDto;
      return this.funcionarioService.atualizarFuncionario(id, nomeFuncionario, cargo, telefones);
    }

    @Delete(':id')
    removerFuncionario(@Param('id', ParseIntPipe) id: number): void {
      return this.funcionarioService.removerFuncionario(id);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number): Funcionario {
      return this.funcionarioService.findOne(id);
    }

    /* @Get('cargo')
    buscarFuncionariosPorCargo(@Query('cargo') query: FindFuncionariosByCargoDto): Funcionario[] {
      const { cargo } = query;
      return this.funcionarioService.findByCargo(cargo);
    } */

}
