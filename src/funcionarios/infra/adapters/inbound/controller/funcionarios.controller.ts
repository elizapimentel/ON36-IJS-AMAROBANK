import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { TipoCargo } from '../../../../../common/enums/tipo-.banco.enum';
import { FuncionariosService } from '../../../../../funcionarios/application/ports/input/service/funcionarios.service';
import { Funcionario } from '../../../../../funcionarios/domain/entities/funcionario.entity';
import { Gerente } from '../../../../../funcionarios/domain/entities/gerente.entity';
import { CreateFuncionarioDto } from '../dto/create-funcionario.dto';


@Controller('funcionarios')
export class FuncionariosController {
  constructor(
    private readonly funcionarioService: FuncionariosService
  ) { }

  @Post()
  cadastrarFuncionario(
    @Body('cargo') cargo: TipoCargo,
    @Body('funcionario') createFuncionarioDto: CreateFuncionarioDto
  ): Funcionario {
    return this.funcionarioService.cadastrarFuncionario(cargo, createFuncionarioDto);
  }

  @Get()
  findAll(): Funcionario[] {
    return this.funcionarioService.findAll();
  }

  @Get(':id')
  findGerenteById(@Param('id') id: string): Gerente | undefined {
    return this.funcionarioService.findGerenteById(id);
  }

  @Get(':id')
  findFuncionarioById(@Param('id') id: string): Funcionario | undefined {
    return this.funcionarioService.findGerenteById(id);
  }

  /*  @Patch(':id')
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
 
    */
}
