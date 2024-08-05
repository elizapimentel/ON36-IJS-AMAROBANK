import { Funcionario } from './Funcionario';

export class Gerente extends Funcionario {
    private id: number;
    private static nextid = 1;
    
    constructor(nome: string, cargo: string, telefones: string[]) {
        super(nome, cargo, telefones);
        this.id = Gerente.nextid;
    }

    public getId(): number {
        return this.id;
    }
}
