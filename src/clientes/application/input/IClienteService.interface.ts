import { UpdateClienteDto } from "../../../clientes/infra/adapters/inbound/dto/update-cliente.dto";
import { ClienteEntity } from "../../../clientes/infra/adapters/entities/cliente.entity";
import { ContaEntity } from "../../../contas/infra/adapters/entities/conta.entity";


export interface IClienteService {
    cadastrarCliente(funcionario: any, criarClienteDto: any): Promise<ClienteEntity>;
    listarTodos(): Promise<ClienteEntity[]>;
    encontrarPorId(id: string): Promise<ClienteEntity>;
    atualizarCliente(id: string, updateClienteDto: UpdateClienteDto): Promise<ClienteEntity>;
    removerCliente(id: string): Promise<void>;
    adicionarConta(clienteId: string, contas: ContaEntity): Promise<ClienteEntity>;
}