import { Cliente } from "../../../clientes/domain/entities/cliente.entity";
import { TipoCargo } from "../../../common/enums/tipo-.banco.enum";
import { IPessoa } from "../../../common/interfaces/pessoa.interface";


export class Funcionario implements IPessoa {
  id?: string;
  cargo: TipoCargo.AGENTE | TipoCargo.GERENTE;
  nomeCompleto: string;
  endereco: string;
  telefones: string[];
  clientes?: Cliente[];
  constructor(cargo: TipoCargo, nomeFuncionario: string, endereco: string, telefones: string[]) {
    this.cargo = cargo;
    this.nomeCompleto = nomeFuncionario;
    this.endereco = endereco;
    this.telefones = telefones;
  }
}
