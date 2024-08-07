import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ContasService } from '../services/contas.service';
import { CreateContaDto } from '../dto/create/create-conta.dto';
import { UpdateContaDto } from '../dto/update/update-conta.dto';
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
      cargo: TipoCargo.GERENTE,
      telefones: ['123456789'],
    };
    return this.contasService.abrirConta(funcionario, createContaDto);
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
    const funcionario: Funcionario = {
      id: 6,
      nomeFuncionario: 'Nome',
      cargo: TipoCargo.GERENTE,
      telefones: ['123456789'],
    };
    return this.contasService.atualizarConta(+id, funcionario, updateContaDto);
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

  @Post('depositar/:id')
  depositar(@Param('id') id: string, @Body('valor') valor: number) {
    return this.contasService.depositar(+id, valor);
  }

  @Post('sacar/:id')
  sacar(@Param('id') id: string, @Body('valor') valor: number) {
    return this.contasService.sacar(+id, valor);
  }

  @Post('transferir')
  transferir(
    @Body('idOrigem', ParseIntPipe) idOrigem: number,
    @Body('idDestino',ParseIntPipe) idDestino: number,
    @Body('valor') valor: number,
  ) {
    return this.contasService.transferir(idOrigem, idDestino, valor);
  }

  @Post('pagar/:id')
  pagarConta(@Param('id') id: string, @Body('valor') valor: number) {
    return this.contasService.pagarConta(+id, valor);
  }

  @Get('saldo/:id')
  consultarSaldo(@Param('id') id: string) {
    return this.contasService.consultarSaldo(+id);
  }
}
