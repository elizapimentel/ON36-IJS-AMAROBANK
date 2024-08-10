// import { Contas } from '../../contas/entities/conta.entity';
import { Gerente } from '../../funcionarios/entities/gerente.entity';
import { IPessoa } from '../../common/interfaces/pessoa.interface';

export class Cliente implements IPessoa {
  id?: string;
  nomeCompleto: string;
  endereco: string;
  telefones: string[];
  // contas?: Contas[];
  gerente?: Gerente;
  constructor(nomeCompleto: string, endereco: string, telefones: string[]) {
    this.nomeCompleto = nomeCompleto;
    this.endereco = endereco;
    this.telefones = telefones;
    // this.contas = [];
    this.gerente = null;
  }
}
