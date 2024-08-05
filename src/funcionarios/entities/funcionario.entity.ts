export enum TipoCargo {
    AGENTE = 'Agente',
    GERENTE = 'Gerente'

}

export class Funcionario {
 
    constructor(
        public id: number, 
        public nomeFuncionario: string, 
        public cargo: TipoCargo, 
        public telefones: string[]
    ) {}
}
