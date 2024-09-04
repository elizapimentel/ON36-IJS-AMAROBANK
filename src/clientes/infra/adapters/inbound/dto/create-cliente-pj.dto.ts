import { GerenteEntity } from "../../../../../funcionarios/infra/adapters/entities/gerente.entity";
import { ClienteEntity } from "../../entities/cliente.entity";

export class CreateClientePJDto {
    readonly razaSocial: string;
    readonly endereco: string;
    readonly telefones: string[];
    readonly cnpj: string;
    readonly areAtuacao: string;
    readonly donos_socios: ClienteEntity[];
    readonly gerenteId?: GerenteEntity;
}