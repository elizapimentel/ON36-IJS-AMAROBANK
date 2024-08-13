import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { ContasService } from '../services/contas.service';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { CreateContaCorrenteDto } from '../dto/create/create-conta-corrente.dto';
import { CreateContaPoupancaDto } from '../dto/create/create-conta-poupana.dto';
import { TipoCargo } from 'src/common/enums/tipo-.conta.enum';

@Controller('contas')
export class ContasController {
  constructor(private readonly contasService: ContasService) {}

  @Post()
  criarContaCorrente(@Body() createContaDto: CreateContaCorrenteDto) {
    const funcionario: Funcionario = {
      id: 6,
      nomeFuncionario: 'Nome',
      cargo: TipoCargo.GERENTE,
      telefones: ['123456789'],
    };
    return this.contasService.abrirContaCorrente(funcionario, createContaDto);
  }

  @Post()
  criarContaPoupanca(@Body() createContaDto: CreateContaPoupancaDto) {
    const funcionario: Funcionario = {
      id: 6,
      nomeFuncionario: 'Nome',
      cargo: TipoCargo.GERENTE,
      telefones: ['123456789'],
    };
    return this.contasService.abrirContaPoupanca(funcionario, createContaDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.contasService.findById(+id);
  }

  @Delete(':id')
  removerConta(@Param('id') id: string) {
    const funcionario: Funcionario = {
      id: 6,
      nomeFuncionario: 'Nome',
      cargo: TipoCargo.GERENTE,
      telefones: ['123456789'],
    };
    return this.contasService.fecharConta(+id, funcionario);
  }

  @Post('sacar/:id')
  sacar(@Param('id') id: string, @Body('valor') valor: number) {
    return this.contasService.sacar(+id, valor);
  }

  @Post('transferir')
  transferir(
    @Body('idOrigem', ParseIntPipe) idOrigem: number,
    @Body('idDestino', ParseIntPipe) idDestino: number,
    @Body('valor') valor: number,
  ) {
    return this.contasService.transferir(idOrigem, idDestino, valor);
  }
}


 /*  @Post('depositar/:id')
  depositar(@Param('id') id: string, @Body('valor') valor: number) {
    return this.contasService.depositar(+id, valor);
  } */

  /* @Post('pagar/:id')
  pagarConta(@Param('id') id: string, @Body('valor') valor: number) {
    return this.contasService.pagarConta(+id, valor);
  } */

  /* @Get('saldo/:id')
  consultarSaldo(@Param('id') id: string) {
    return this.contasService.consultarSaldo(+id);
  } */


  /* @Patch(':id')
  atualizarConta(
    @Param('id') id: string,
    @Body() updateContaDto: UpdateContaDto,
  ) {
    const funcionario: Funcionario = {
      id: 6,
      nomeFuncionario: 'Nome',
      cargo: TipoCargo.GERENTE,
      telefones: ['123456789'],
    };
    return this.contasService.atualizarConta(+id, funcionario, updateContaDto);
  }
 */