export class CreateClienteDto {
    readonly id: number;
    readonly nomeCompleto: string;
    readonly endereco: string;
    readonly telefone: string;
    readonly contas: any[];
    readonly gerente: any;
}
