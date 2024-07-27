import { Funcionario, TipoCargo } from './funcionario.entity';
import { Cliente } from '../../clientes/entities/cliente.entity';

export class Gerente extends Funcionario {
    private clientes: Cliente[];	

    constructor(
        gerenteId: number,
        nomeFuncionario: string, 
        cargo: string, 
        telefones: string[], 
        autorizado: boolean, 
        clientes: Cliente[]) {
        super(gerenteId, nomeFuncionario, TipoCargo.GERENTE, telefones);
        this.clientes = clientes;
    }

}
