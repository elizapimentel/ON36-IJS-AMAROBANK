import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { Contas } from '../entities/conta.entity';
import { CreateContaCorrenteDto } from '../dto/create/create-conta-corrente.dto';
import { CreateContaPoupancaDto } from '../dto/create/create-conta-poupanca.dto';
import { ContasFactory } from 'src/factories/contas.factory';
import { TipoCargo, TipoConta, TipoTransacao } from '../../common/enums/tipo-.banco.enum';
import { ContasRepository } from '../repository/contas.repository';
import { ContaCorrente } from '../entities/conta-corrente.entity';
import { ContaPoupanca } from '../entities/conta-poupanca.entity';
import { TransacoesRepository } from '../../transacoes/repository/transacoes.repository';
import { IContaService } from './IContasService.interface';
import { CriarTransactionDto } from 'src/transacoes/dto/create-transaction.dto';
import { TransacoesFactory } from '../../factories/transacoes.factory';
import { randomUUID as uuid } from 'crypto';

@Injectable()
export class ContasService implements IContaService {

  constructor(
    private readonly contasRepo: ContasRepository,
    private readonly transacaoRepo: TransacoesRepository,
    private readonly contasFactory: ContasFactory,
    private readonly transacaoFactory: TransacoesFactory,
  ) { }


  cadastrarContaCorrente(
    funcionario: Funcionario,
    contaDto: CreateContaCorrenteDto,
  ): ContaCorrente {
    if (funcionario.cargo !== TipoCargo.GERENTE) {
      throw new NotFoundException(`Funcionário não autorizado`);
    }

    const novaContaCorrente = this.contasFactory.criarConta(
      TipoConta.CORRENTE,
      contaDto
    ) as ContaCorrente;

    return this.contasRepo.cadastrarContaCorrente(novaContaCorrente);
  }


  cadastrarContaPoupanca(
    funcionario: Funcionario,
    contaDto: CreateContaPoupancaDto,
  ): ContaPoupanca {
    if (funcionario.cargo !== TipoCargo.GERENTE) {
      throw new NotFoundException(`Funcionário não autorizado`);
    }

    const novaContaPoupanca = this.contasFactory.criarConta(
      TipoConta.POUPANCA,
      contaDto
    ) as ContaPoupanca;

    return this.contasRepo.cadastrarContaPoupanca(novaContaPoupanca);
  }

  encontrarConta(numeroConta: string): Contas | undefined {
    return this.contasRepo.encontrarConta(numeroConta);
  }

  encerrarConta(numeroConta: string, funcionario: Funcionario): void {
    if (funcionario.cargo !== TipoCargo.GERENTE) {
      throw new NotFoundException(`Funcionário não autorizado`);
    }
    const conta = this.encontrarConta(numeroConta);
    if (!conta) {
      throw new NotFoundException(`Conta com número ${numeroConta} não encontrada`);
    }
    this.contasRepo.encerrarConta(conta.numeroConta);
  }

  sacar(numeroConta: string, valor: number): void {
    const conta = this.encontrarConta(numeroConta);
    if (!conta) {
      throw new NotFoundException(`Conta ${numeroConta} não encontrada`);
    }
    if (valor <= 0) {
      throw new BadRequestException('Valor do saque deve ser positivo');
    }
    if (conta.saldo < valor) {
      throw new BadRequestException('Saldo insuficiente');
    }

    this.contasRepo.sacar(numeroConta, valor);

    this.addTransacao(numeroConta, -valor, TipoTransacao.SAQUE);

  }

  depositar(numConta: string, valor: number): void {
    throw new Error('Method not implemented.');
  }
  transferir(valor: number, contaDestino: Contas): void {
    throw new Error('Method not implemented.');
  }
  consultarSaldo(numConta: string): number {
    throw new Error('Method not implemented.');
  }
  pagarConta(valor: number): void {
    throw new Error('Method not implemented.');
  }


  private addTransacao(numeroConta: string, valor: number, tipo: TipoTransacao): void {
    const dto: CriarTransactionDto = {
      id: uuid(),
      numConta: numeroConta,
      valor: valor,
      tipo: tipo,
      data: new Date(),
    };

    const transacao = this.transacaoFactory.criarTransacao(dto);

    console.log('Transação criada:', transacao);

    this.transacaoRepo.cadastrarTransacao(transacao);

     console.log('Transações após cadastro:', this.transacaoRepo.transacoes);

  }



  /* consultarSaldo(id: number): number {
    const contas = this.readContas();
    const conta = contas.find((c) => c.id === id);

    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada`);
    }

    if (conta instanceof ContaPoupanca) {
      this.aplicarTaxaJuros(conta);
    }

    return conta.saldo;
  } */

  /* private aplicarTaxaJuros(conta: ContaPoupanca): void {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth();
    const anoAtual = dataAtual.getFullYear();

    if (
      !conta.ultimoCalculoJuros ||
      conta.ultimoCalculoJuros.getMonth() !== mesAtual ||
      conta.ultimoCalculoJuros.getFullYear() !== anoAtual
    ) {
      const saldoAnterior = conta.saldo;
      const novoSaldo = saldoAnterior * (1 + conta.taxaJuros / 100);
      conta.saldo = novoSaldo;
      conta.ultimoCalculoJuros = new Date();

      const contas = this.readContas();
      const contaIndex = contas.findIndex((c) => c.id === conta.id);
      contas[contaIndex] = conta;
      this.writeContas(contas);
    }
  } */

  /* pagarConta(id: number, valor: number): void {
    const contas = this.readContas();
    const conta = contas.find((c) => c.id === id);

    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada`);
    }

    if (conta instanceof ContaCorrente) {
      if (conta.saldo + conta.limiteChequeEspecial < valor) {
        throw new BadRequestException(
          'Saldo e limite de cheque especial insuficientes para o pagamento',
        );
      }

      const saldoNecessario = valor - conta.saldo;
      if (saldoNecessario > 0) {
        // Se o saldo não é suficiente usa o limite de cheque especial
        if (conta.limiteChequeEspecial < saldoNecessario) {
          console.warn(
            `Conta ${conta.numeroConta} está entrando no cheque especial.`,
          );
        }
        conta.limiteChequeEspecial -= saldoNecessario;
        conta.saldo = 0;
      } else {
        conta.saldo -= valor;
      }
    } else if (conta instanceof ContaPoupanca) {
      if (conta.saldo < valor) {
        throw new BadRequestException('Saldo insuficiente para o pagamento');
      }

      conta.saldo -= valor;
    } else {
      throw new Error('Tipo de conta inválido');
    }

    this.writeContas(contas);

    // Registrar a transação
    this.transacoesService.criarTransacao(id, -valor, TipoTransacao.PAGAMENTO);
  } */

  /* atualizarConta(id: number, funcionario: Funcionario, updateContaDto: UpdateContaDto): Contas {
    const contas = this.readContas();

    if (funcionario.cargo !== TipoCargo.GERENTE) {
      throw new NotFoundException(`Funcionário não autorizado`);
    }

    const contaIndex = contas.findIndex((c) => c.id === id);

    if (contaIndex === -1) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada`);
    }

    let atualizarConta: Contas;
    const contaAtual = contas[contaIndex];

    if (updateContaDto instanceof UpdateContaCorrenteDto) {
      if (!(contaAtual instanceof ContaCorrente)) {
        throw new Error('Tipo de conta não corresponde ao tipo de atualização');
      }

      atualizarConta = new ContaCorrente(
        contaAtual.id,
        contaAtual.numeroConta,
        contaAtual.saldo,
        contaAtual.transacoes,
        updateContaDto.limiteChequeEspecial || contaAtual.limiteChequeEspecial,
      );
    } else if (updateContaDto instanceof UpdateContaPoupancaDto) {
      if (!(contaAtual instanceof ContaPoupanca)) {
        throw new Error('Tipo de conta não corresponde ao tipo de atualização');
      }

      atualizarConta = new ContaPoupanca(
        contaAtual.id,
        contaAtual.numeroConta,
        contaAtual.saldo,
        contaAtual.transacoes,
        updateContaDto.taxaJuros || contaAtual.taxaJuros,
      );
    } else {
      throw new Error('Tipo de conta inválido');
    }

    contas[contaIndex] = atualizarConta;
    this.writeContas(contas);
    return atualizarConta;
  } */

  /*  depositar(id: number, valor: number): void {
    const contas = this.readContas();
    const conta = contas.find((c) => c.id === id);

    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada`);
    }

    if (valor <= 0) {
      throw new BadRequestException('Valor do depósito deve ser positivo');
    }

    conta.saldo += valor;
    this.writeContas(contas);

    // Registrar a transação
    this.transacoesService.criarTransacao(id, valor, TipoTransacao.DEPOSITO);
  } */
}
