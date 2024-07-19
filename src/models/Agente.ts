import { Funcionario } from './Funcionario';

export class Agente extends Funcionario {
    private id: number;
    private static nextid = 1; //id para contabilizar registros enquanto não possui BD
    
    constructor(nome: string, cargo: string, telefones: string[]) {
        super(nome, cargo, telefones);
        this.id = Agente.nextid;
    }

    public getId(): number {
        return this.id;
    }
}
