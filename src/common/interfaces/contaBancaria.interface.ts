export interface ContaBancaria {
    depositar(valor: number): void;
    sacar(valor: number): void;
    transferir(valor: number, contaDestino: ContaBancaria): void;
    consultarSaldo(): number;
}