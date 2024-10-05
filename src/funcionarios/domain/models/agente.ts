import { TipoCargo } from '../../../common/enums/tipo-.banco.enum';
import { Funcionario } from './funcionario';

export class Agente extends Funcionario {
    constructor(nomeFuncionario: string, endereco: string, telefones: string[]) {
        super(TipoCargo.AGENTE, nomeFuncionario, endereco, telefones);
    }
}
