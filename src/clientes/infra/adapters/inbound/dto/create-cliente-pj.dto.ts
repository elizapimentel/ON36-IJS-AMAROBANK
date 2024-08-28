import { Cliente } from "../../../../../clientes/domain/entities/cliente.entity";

export class CreateClientePJDto {
    readonly razaSocial: string;
    readonly endereco: string;
    readonly telefones: string[];
    readonly cnpj: string;
    readonly areAtuacao: string;
    readonly donos_socios: Cliente[];
    readonly gerenteId?: string;
}