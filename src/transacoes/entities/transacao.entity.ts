
export enum TipoTransacao {
    DEBITO = 'debito',
    CREDITO = 'credito'
}

export class Transacao {
    constructor(
        public id: number,
        public numConta: number,
        public valor: number,
        public tipo: TipoTransacao,
        public data: Date
    ){}
}
