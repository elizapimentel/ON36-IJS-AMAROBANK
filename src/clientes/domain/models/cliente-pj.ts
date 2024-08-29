import { IPessoa } from '../../../common/interfaces/pessoa.interface';
import { Contas } from '../../../contas/domain/models/conta';
import { Gerente } from '../../../funcionarios/domain/models/gerente.entity
import { Cliente } from './cliente';
import { randomUUID as uuid } from 'crypto';

export class ClientePJ implements IPessoa {
    id?: string;
    razao_social: string;
    endereco: string;
    telefones: string[];
    cnpj: string;
    areAtuacao: string;
    donos_socios: Cliente[];
    nome_fantasia?: string;
    contas?: Contas[];
    gerente?: Gerente;
    constructor(razao_social: string, endereco: string, telefones: string[], cnpj: string, areAtuacao: string, donos_socios: Cliente[]) {
        this.id = uuid();
        this.razao_social = razao_social;
        this.endereco = endereco;
        this.telefones = telefones;
        this.cnpj = cnpj;
        this.areAtuacao = areAtuacao;
        this.donos_socios = donos_socios;
        // this.contas = [];
    }
}