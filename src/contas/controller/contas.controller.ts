import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
} from '@nestjs/common';
import { ContasService } from '../services/contas.service';
import { CreateContaCorrenteDto } from '../dto/create/create-conta-corrente.dto';
import { CreateContaPoupancaDto } from '../dto/create/create-conta-poupanca.dto';
import { Gerente } from '../../funcionarios/entities/gerente.entity';
import { TipoCargo } from '../../common/enums/tipo-.banco.enum';

@Controller('contas')
export class ContasController {
  constructor(private readonly contasService: ContasService) { }

  @Post()
  criarContaCorrente(@Body() createContaDto: CreateContaCorrenteDto) {
    const funcionarioAut = {
      id: "6",
      nomeCompleto: 'Nome',
      cargo: TipoCargo.GERENTE,
      endereco: "rua da flores,01",
      telefones: ["123456789"],
    };
    return this.contasService.cadastrarContaCorrente(funcionarioAut, createContaDto);
  }

  @Post()
  criarContaPoupanca(@Body() createContaDto: CreateContaPoupancaDto, funcionario: Gerente) {
    return this.contasService.cadastrarContaPoupanca(funcionario, createContaDto);
  }

  @Get(':id')
  encontrarConta(@Param('id') numConta: string) {
    return this.contasService.encontrarConta(numConta);
  }

  @Delete(':id')
  removerConta(@Param('id') id: string, funcionario: Gerente) {
    return this.contasService.encerrarConta(id, funcionario);
  }

  @Post('sacar/:id')
  sacar(@Param('id') id: string, @Body('valor') valor: number) {
    return this.contasService.sacar(id, valor);
  }

  // @Post('transferir')
  // transferir(
  //   @Body('idOrigem', ParseIntPipe) idOrigem: number,
  //   @Body('idDestino', ParseIntPipe) idDestino: number,
  //   @Body('valor') valor: number,
  // ) {
  //   return this.contasService.transferir(idOrigem, idDestino, valor);
  // }
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