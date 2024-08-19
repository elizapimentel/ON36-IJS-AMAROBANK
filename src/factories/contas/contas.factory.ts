import { Injectable } from '@nestjs/common';
import { TipoConta } from '../../common/enums/tipo-.banco.enum';
import { CreateContaCorrenteDto } from '../../contas/dto/create/create-conta-corrente.dto';
import { CreateContaPJDto } from '../../contas/dto/create/create-conta-pj.dto';
import { CreateContaPoupancaDto } from '../../contas/dto/create/create-conta-poupanca.dto';
import { CreateContaDto } from '../../contas/dto/create/create-conta.dto';
import { ContaCorrente } from '../../contas/entities/conta-corrente.entity';
import { ContaPJ } from '../../contas/entities/conta-pj.entity';
import { ContaPoupanca } from '../../contas/entities/conta-poupanca.entity';
import { Contas } from '../../contas/entities/conta.entity';


@Injectable()
export class ContasFactory {
  criarConta(
    tipo: TipoConta,
    conta: CreateContaDto,
  ): Contas {
    switch (tipo) {
      case TipoConta.CORRENTE:
        const contaCorrenteDto = conta as CreateContaCorrenteDto;
        return new ContaCorrente(
        //  contaCorrenteDto.id,
         contaCorrenteDto.numeroConta,
         contaCorrenteDto.saldo,
         contaCorrenteDto.transacoes,
         contaCorrenteDto.limiteChequeEspecial,
        );
      case TipoConta.POUPANCA:
        const contaPoupancaDto = conta as CreateContaPoupancaDto; 
        return new ContaPoupanca(
          // contaPoupancaDto.id,
          contaPoupancaDto.numeroConta,
          contaPoupancaDto.saldo,
          contaPoupancaDto.transacoes,
          contaPoupancaDto.taxaJuros!, 
        );
        case TipoConta.PJ:
          const contaPJDto = conta as CreateContaPJDto;
          return new ContaPJ(
            contaPJDto.numeroConta,
            contaPJDto.saldo,
            contaPJDto.transacoes,
            contaPJDto.limiteChequeEspecial,
            contaPJDto.cnpj,
          )
      default:
        throw new Error('Tipo de conta inválido');
    }
  }
}
