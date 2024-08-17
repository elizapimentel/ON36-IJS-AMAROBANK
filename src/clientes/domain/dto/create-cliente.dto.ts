
export class CreateClienteDto {
    readonly nomeCompleto: string;
    readonly endereco: string;
    readonly telefones: string[];
    readonly gerenteId?: string;
}
