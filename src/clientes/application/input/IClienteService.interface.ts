import { UpdateClienteDto } from "../../../clientes/infra/adapters/inbound/dto/update-cliente.dto";
import { ClienteEntity } from "../../../clientes/infra/adapters/entities/cliente.entity";
import { UUID } from "crypto";


export interface IClienteService {
    encontrarPorId(id: UUID): Promise<ClienteEntity>;
    atualizarCliente(id: UUID, updateClienteDto: UpdateClienteDto): Promise<ClienteEntity>;
    removerCliente(id: UUID): Promise<void>;
    
}

export const IClienteService = Symbol('IClienteService');