import { Injectable } from '@nestjs/common';
import { TipoConta } from 'src/common/enums/tipo-.conta.enum';
import { ContaCorrente } from 'src/contas/entities/conta-corrente.entity';
import { ContaPoupanca } from 'src/contas/entities/conta-poupanca.entity';
import { Contas } from 'src/contas/entities/conta.entity';
import { Transacao } from 'src/transacoes/entities/transacao.entity';

@Injectable()
export class ContasFactory {
  static criarConta(
    tipo: TipoConta,
    id: number,
    numeroConta: number,
    saldo: number,
    transacoes: Transacao[],
    limiteChequeEspecial?: number,
    taxaJuros?: number,
    ultimoCalculoJuros?: Date,
  ): Contas {
    switch (tipo) {
      case TipoConta.CORRENTE:
        return new ContaCorrente(
          id,
          numeroConta,
          saldo,
          transacoes,
          TipoConta.CORRENTE,
          limiteChequeEspecial,
        );
      case TipoConta.POUPANCA:
        return new ContaPoupanca(
          id,
          numeroConta,
          saldo,
          transacoes,
          TipoConta.POUPANCA,
          taxaJuros,
          ultimoCalculoJuros,
        );
      default:
        throw new Error('Tipo de conta inválido');
    }
  }
}
