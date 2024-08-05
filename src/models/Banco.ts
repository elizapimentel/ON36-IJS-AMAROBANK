import { Cliente } from './Cliente';
import { Funcionario } from './Funcionario';
import { Conta } from './Conta';
import { Stakeholders } from './Stakeholders';
import { PrestadorServico } from './PrestadorServico'; 
import { FundoSolidario } from './FundoSolidario';
import { Moeda } from './Moeda';

export class Banco {

    private id: number;
    private nome: string;
    private endereco: string;
    private cnpj: string;
    private listaClientes: Cliente[];
    private listaFuncionarios: Funcionario[];
    private listaContas: Conta[];
    private listaStakeholders: Stakeholders[];
    private listaPrestadores: PrestadorServico[];
    private fundoSolidario: FundoSolidario;
    private moeda: Moeda;

    constructor(id: number, nome: string, cnpj: string, endereco: string, moeda: Moeda) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.cnpj = cnpj;
        this.listaClientes = [];
        this.listaFuncionarios = [];
        this.listaContas = [];
        this.listaStakeholders = [];
        this.listaPrestadores = [];
        this.fundoSolidario = new FundoSolidario();
        this.moeda = moeda;
    }

    public getId(): number {
        return this.id;
    }
    
    public getCnpj(): string {
        return this.cnpj;
    }

    public abrirConta(cliente: Cliente, conta: Conta, token: Funcionario): void {
        cliente.adicionarConta(conta, token);
        this.listaContas.push(conta);
    }

    public fecharConta(conta: Conta, token: Funcionario): void {}

    //verificar este metodo
    public consultarClientes(token: Funcionario): Cliente[] {
        return this.listaClientes;
    }

    public analisarCredito(cliente: Cliente, token: Funcionario): void {}

    public processarTransacao(token: Funcionario): void {}

    public consultarSaldo(token: Funcionario): number { 
        return 0; 
    }
    
    public emitirExtrato(token: Funcionario): string { 
        return ''; 
    }

    public registrarServico(prestador: PrestadorServico, token: Funcionario): void {
        this.listaPrestadores.push(prestador);
    }

    public registrarContribuicao(stakeholder: Stakeholders, token: Funcionario): void {
        this.listaStakeholders.push(stakeholder);
    }


}