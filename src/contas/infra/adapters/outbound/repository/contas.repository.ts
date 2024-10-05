import { Injectable } from '@nestjs/common';
import { ContaCorrente } from '../../../../../contas/domain/entities/conta-corrente.entity';
import { ContaPoupanca } from '../../../../../contas/domain/entities/conta-poupanca.entity';
import { Contas } from '../../../../../contas/domain/entities/conta.entity';


@Injectable()
export class ContasRepository {
    private contas: Contas[] = [];

    constructor() { }

    cadastrarContaCorrente(conta: ContaCorrente): ContaCorrente {
        this.contas.push(conta);
        return conta;
    }

    cadastrarContaPoupanca(conta: ContaPoupanca): ContaPoupanca {
        this.contas.push(conta);
        return conta;
    }

    encontrarConta(numeroConta: string): Contas | undefined {
        const conta = this.contas.find(conta => conta.numeroConta === numeroConta);
        return conta;
    }

    encerrarConta(numeroConta: string): void {
        const contaIndex = this.contas.findIndex(conta => conta.numeroConta === numeroConta);
        this.contas.splice(contaIndex, 1);
    }

    sacar(numeroConta: string, valor: number): void {
        const conta = this.encontrarConta(numeroConta);
        if (conta) {
            conta.saldo -= valor;
        }
    }

    transferir(contaOrigem: Contas, contaDestino: Contas, valor: number): void {
        contaOrigem.saldo -= valor;
        contaDestino.saldo += valor;
    }

}
