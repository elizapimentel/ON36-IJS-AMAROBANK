import { UpdateClienteDto } from "../../domain/dto/update-cliente.dto";
import { Cliente } from "../../domain/entities/cliente.entity";


export interface IClienteService {
    listarTodos(): Cliente[];
    encontrarPorId(id: string): Cliente;
    atualizarCliente(id: string, updateClienteDto: UpdateClienteDto): Cliente;
    removerCliente(id: string): void;
}