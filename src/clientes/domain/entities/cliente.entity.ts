import { IPessoa } from "../../../common/interfaces/pessoa.interface";
import { Contas } from "../../../contas/domain/entities/conta.entity";
import { Gerente } from "../../../funcionarios/domain/entities/gerente.entity";


export class Cliente implements IPessoa {
  id?: string;
  nomeCompleto: string;
  endereco: string;
  telefones: string[];
  contas?: Contas[];
  gerente?: Gerente;
  constructor(nomeCompleto: string, endereco: string, telefones: string[]) {
    this.nomeCompleto = nomeCompleto;
    this.endereco = endereco;
    this.telefones = telefones;
    this.contas = [];
    this.gerente = null;
  }
}
