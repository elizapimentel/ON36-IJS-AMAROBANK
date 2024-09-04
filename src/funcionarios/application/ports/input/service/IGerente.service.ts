import { CreateClienteDto } from "../../../../../clientes/infra/adapters/inbound/dto/create-cliente.dto";
import { GerenteEntity } from "../../../../infra/adapters/entities/gerente.entity";
import { ClienteEntity } from "../../../../../clientes/infra/adapters/entities/cliente.entity";
import { ContaEntity } from "../../../../../contas/infra/adapters/entities/conta.entity";
import { UUID } from "crypto";

export interface IGerenteService {
    buscarPorId(id: UUID): Promise<GerenteEntity | undefined>;
    cadastrarCliente(idGerente: UUID, dto: CreateClienteDto): Promise<ClienteEntity>;
    abrirConta(idGerente: UUID, clienteId: UUID, contas: ContaEntity): Promise<ClienteEntity>;
}

export const IGerenteService = Symbol('IGerenteService');
