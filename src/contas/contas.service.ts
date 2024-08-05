import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';
import { Conta } from './entities/conta.entity';
import {
  TipoTransacao,
  Transacao,
} from 'src/transacoes/entities/transacao.entity';
import { TransacoesService } from 'src/transacoes/transacoes.service';
import {
  Funcionario,
  TipoCargo,
} from 'src/funcionarios/entities/funcionario.entity';

@Injectable()
export class ContasService {
  private readonly filePath = path.resolve('src/contas/contas.json');
  private idCounter: number;
  transacoesService: TransacoesService;

  constructor() {
    const contas = this.readContas();
    this.idCounter = contas.length > 0 ? contas[contas.length - 1].id + 1 : 1;
  }

  private readContas(): Conta[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Conta[];
  }

  private writeContas(contas: Conta[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(contas, null, 2), 'utf8');
  }

  criarConta(funcionario: Funcionario, criarContaDto: CreateContaDto): Conta {
    if (funcionario.cargo !== TipoCargo.GERENTE) {
      throw new NotFoundException(`Funcionário não autorizado`);
    }
    const contas = this.readContas();
    const novaConta: Conta = {
      id: this.idCounter++,
      ...criarContaDto,
    };

    contas.push(novaConta);
    this.writeContas(contas);
    return novaConta;
  }

  findAll(): Conta[] {
    return this.readContas();
  }

  findById(id: number): Conta {
    const contas = this.readContas();
    const conta = contas.find((c) => c.id === id);

    if (!conta) {
      throw new NotFoundException(`Conta with ID ${id} not found`);
    }

    return conta;
  }

  atualizarConta(id: number, updateContaDto: UpdateContaDto): Conta {
    const contas = this.readContas();
    const contaIndex = contas.findIndex((c) => c.id === id);

    if (contaIndex === -1) {
      throw new NotFoundException(`Conta with ID ${id} not found`);
    }

    const updatedConta = { ...contas[contaIndex], ...updateContaDto };
    contas[contaIndex] = updatedConta;
    this.writeContas(contas);
    return updatedConta;
  }

  removerConta(id: number): void {
    const contas = this.readContas();
    const updatedContas = contas.filter((c) => c.id !== id);

    if (contas.length === updatedContas.length) {
      throw new NotFoundException(`Conta with ID ${id} not found`);
    }

    this.writeContas(updatedContas);
  }

  // Método para adicionar uma transação à conta
  adicionarTransacao(
    id: number,
    numConta: number,
    valor: number,
    tipo: TipoTransacao,
  ): Transacao {
    const conta = this.findById(id);
    if (!conta) {
      throw new NotFoundException(`Conta with ID ${id} not found`);
    }

    // injetar TransacoesService para criar a transação
    const novaTransacao = this.transacoesService.criarTransacao(
      numConta,
      valor,
      tipo,
    );

    return novaTransacao;
  }
}
