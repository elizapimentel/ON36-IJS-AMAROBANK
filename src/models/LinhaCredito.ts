import { Cliente } from './Cliente';
import { Funcionario } from './Funcionario';


export class LinhaCredito {
  private id: number;
  private valor: DoubleRange; 
  private cliente: Cliente;

  private static nextid = 1;

  constructor(valor: DoubleRange, cliente: Cliente) {
    this.id = LinhaCredito.nextid++;
    this.valor = valor;
    this.cliente = cliente;
  }

   public getCliente(): Cliente {
    return this.cliente;
  }

  public setValor(valor: DoubleRange): void {
    this.valor = valor;
  }

  public setCliente(cliente: Cliente): void {
    this.cliente = cliente;
  }

  public consultarCliente(token: Funcionario): Cliente {
    return this.cliente;
  }

  public aprovarCredito(token: Funcionario): boolean {
    // Implementar lógica para aprovar crédito
    return false;
  }

  public consultarCredito(token: Funcionario): DoubleRange {
    return this.valor;
  }

 
}
