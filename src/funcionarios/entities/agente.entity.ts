import { Funcionario, TipoCargo } from "./funcionario.entity";

export class Agente extends Funcionario {
       
    constructor(
        agenteId: number,
        nomeFuncionario: string, 
        cargo: string, 
        telefones: string[], 
        autorizado: boolean) {
        super(agenteId, nomeFuncionario, TipoCargo.AGENTE, telefones);
    }

}
