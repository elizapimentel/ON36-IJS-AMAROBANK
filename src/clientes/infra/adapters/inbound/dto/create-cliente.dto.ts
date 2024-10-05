import { GerenteEntity } from "../../../../../funcionarios/infra/adapters/entities/gerente.entity";

export class CreateClienteDto {
    readonly nomeCompleto: string;
    readonly endereco: string;
    readonly telefones: string[];
    readonly gerenteId?: GerenteEntity;
}
