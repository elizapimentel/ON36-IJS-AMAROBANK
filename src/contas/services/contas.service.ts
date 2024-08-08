import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { TransacoesService } from 'src/transacoes/service/transacoes.service';
import { Funcionario } from 'src/funcionarios/entities/funcionario.entity';
import { Contas } from '../entities/conta.entity';
import { CreateContaCorrenteDto } from '../dto/create/create-conta-corrente.dto';
import { CreateContaPoupancaDto } from '../dto/create/create-conta-poupana.dto';
import { log } from 'console';
import { ContasFactory } from 'src/factories/contas.factory';
import { TipoCargo, TipoConta, TipoTransacao } from 'src/common/enums/tipo-.conta.enum';

@Injectable()
export class ContasService {
  private readonly filePath = path.resolve('src/contas/contas.json');
  private idCounter: number;

  constructor(
    @Inject(forwardRef(() => TransacoesService))
    private readonly transacoesService: TransacoesService,
  ) {
    const contas = this.readContas();
    this.idCounter = contas.length > 0 ? contas[contas.length - 1].id + 1 : 1;
  }

  private readContas(): Contas[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Contas[];
  }

  private writeContas(contas: Contas[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(contas, null, 2), 'utf8');
  }

  abrirContaCorrente(
    funcionario: Funcionario,
    criarContaDto: CreateContaCorrenteDto,
  ): Contas {
    if (funcionario.cargo !== TipoCargo.GERENTE) {
      throw new NotFoundException(`Funcionário não autorizado`);
    }

    const novaConta = ContasFactory.criarConta(
      TipoConta.CORRENTE,
      this.idCounter++,
      criarContaDto.numeroConta,
      criarContaDto.saldo,
      criarContaDto.transacoes,
      criarContaDto.limiteChequeEspecial,
    );

    const contas = this.readContas();
    contas.push(novaConta);
    this.writeContas(contas);
    return novaConta;
  }

  abrirContaPoupanca(
    funcionario: Funcionario,
    criarContaDto: CreateContaPoupancaDto,
  ): Contas {
    if (funcionario.cargo !== TipoCargo.GERENTE) {
      throw new NotFoundException(`Funcionário não autorizado`);
    }

    const novaConta = ContasFactory.criarConta(
      TipoConta.POUPANCA,
      this.idCounter++,
      criarContaDto.numeroConta,
      criarContaDto.saldo,
      criarContaDto.transacoes,
      criarContaDto.taxaJuros,
    );

    const contas = this.readContas();
    contas.push(novaConta);
    this.writeContas(contas);
    return novaConta;
  }

  findById(id: number): Contas {
    const contas = this.readContas();
    const conta = contas.find((c) => c.id === id);

    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada`);
    }

    return conta;
  }

  fecharConta(id: number, funcionario: Funcionario): void {
    const contas = this.readContas();

    if (funcionario.cargo !== TipoCargo.GERENTE) {
      throw new NotFoundException(`Funcionário não autorizado`);
    }

    const updatedContas = contas.filter((c) => c.id !== id);

    if (contas.length === updatedContas.length) {
      throw new NotFoundException(`Conta com ID ${id} não encontrado`);
    }

    log(`Conta com ID ${id} removida`);
    this.writeContas(updatedContas);
  }

  sacar(id: number, valor: number): void {
    const contas = this.readContas();
    const conta = contas.find((c) => c.id === id);

    if (!conta) {
      throw new NotFoundException(`Conta com ID ${id} não encontrada`);
    }

    if (valor <= 0) {
      throw new BadRequestException('Valor do saque deve ser positivo');
    }

    if (conta.saldo < valor) {
      throw new BadRequestException('Saldo insuficiente');
    }

    conta.saldo -= valor;
    this.writeContas(contas);

    this.transacoesService.criarTransacao(id, valor, TipoTransacao.SAQUE);
  }

  transferir(idOrigem: number, idDestino: number, valor: number): void {
    const contas = this.readContas();
    const contaOrigem = contas.find((c) => c.id === idOrigem);
    const contaDestino = contas.find((c) => c.id === idDestino);

    if (!contaOrigem) {
      throw new NotFoundException(
        `Conta de origem com ID ${idOrigem} não encontrada`,
      );
    }

    if (!contaDestino) {
      throw new NotFoundException(
        `Conta de destino com ID ${idDestino} não encontrada`,
      );
    }

    if (valor <= 0) {
      throw new BadRequestException('Valor da transferência deve ser positivo');
    }

    if (contaOrigem.saldo < valor) {
      throw new BadRequestException('Saldo insuficiente');
    }

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;
    this.writeContas(contas);

    this.transacoesService.criarTransacao(
      idOrigem,
      valor,
      TipoTransacao.TRANSFERENCIA,
    );
    this.transacoesService.criarTransacao(
      idDestino,
      valor,
      TipoTransacao.TRANSFERENCIA,
    );
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
