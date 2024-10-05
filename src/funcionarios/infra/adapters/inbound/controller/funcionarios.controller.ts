import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { TipoCargo } from '../../../../../common/enums/tipo-.banco.enum';
import { CreateFuncionarioDto } from '../dto/create-funcionario.dto';
import { FuncionarioEntity } from '../../entities/funcionario.entity';
import { UUID } from 'crypto';
import { IFuncionarioService } from '../../../../../funcionarios/application/ports/input/service/IFuncionario.service';
import { UpdateFuncionarioDto } from '../dto/update-funcionario.dto';


@Controller('funcionarios')
export class FuncionariosController {
  constructor(
    @Inject(IFuncionarioService) 
    private readonly funcionarioService: IFuncionarioService,
  ) { }

  @Post()
  cadastrarFuncionario(
    @Body('cargo') cargo: TipoCargo,
    @Body('funcionario') createFuncionarioDto: CreateFuncionarioDto
  ): Promise<FuncionarioEntity> {
    return this.funcionarioService.cadastrarFuncionario(cargo, createFuncionarioDto);
  }

  @Get()
  findAll(): Promise<FuncionarioEntity[]> {
    return this.funcionarioService.listarTodos();
  }

  @Get(':id')
  findFuncionarioById(@Param('id') id: UUID): Promise<FuncionarioEntity | undefined> {
    return this.funcionarioService.findFuncionarioById(id);
  }

  @Get('/cargo/:cargo')
  findFuncionarioByCargo(@Param('cargo') cargo: TipoCargo): Promise<FuncionarioEntity[]> {
    return this.funcionarioService.findFuncionarioByCargo(cargo);
  }

  @Patch(':id')
   atualizarFuncionario(
     @Param('id') id: UUID,
     @Body() updateFuncionarioDto: UpdateFuncionarioDto,
   ): Promise<FuncionarioEntity> {
     return this.funcionarioService.atualizarDadosFuncionario(
       id,
       updateFuncionarioDto,
     );
   }
 
   @Delete(':id')
   removerFuncionario(@Param('id') id: UUID): Promise<void> {
     return this.funcionarioService.removerFuncionario(id);
   }

}
