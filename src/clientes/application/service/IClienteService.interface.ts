import { Cliente } from "../entities/cliente.entity";
import { UpdateClienteDto } from "../dto/update-cliente.dto";

export interface IClienteService {
    listarTodos(): Cliente[];
    encontrarPorId(id: string): Cliente;
    atualizarCliente(id: string, updateClienteDto: UpdateClienteDto): Cliente;
    removerCliente(id: string): void;
}