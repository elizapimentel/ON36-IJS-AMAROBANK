import { NotFoundException } from "@nestjs/common";
import { GerenteEntity } from "../../../../infra/adapters/entities/gerente.entity";
import { GerenteRepository } from "../../../../infra/adapters/outbound/repository/gerente.repository";
import { IGerenteService } from "./IGerente.service";
import { ClienteEntity } from "../../../../../clientes/infra/adapters/entities/cliente.entity";
import { TipoCargo } from "../../../../../common/enums/tipo-.banco.enum";
import { ClientesRepository } from "../../../../../clientes/infra/adapters/outbound/repository/clientes.repository";
import { CreateClienteDto } from "../../../../../clientes/infra/adapters/inbound/dto/create-cliente.dto";
import { ContaEntity } from "../../../../../contas/infra/adapters/entities/conta.entity";
import { UUID } from "crypto";

export class GerenteService implements IGerenteService {
    constructor(
        private readonly repo: GerenteRepository,
        private readonly clienteRepo: ClientesRepository,
    ) { }

    async buscarPorId(id: UUID): Promise<GerenteEntity | undefined> {
        const gerente = await this.repo.findOne({ where: { id: id } });
        if (!gerente) {
            throw new NotFoundException('Gerente não encontrado');
        }
        return gerente;
    }

    async cadastrarCliente(
        idGerente: UUID,
        criarClienteDto: CreateClienteDto
    ): Promise<ClienteEntity> {
        const gerente = await this.buscarPorId(idGerente);

        if (gerente.cargo !== TipoCargo.GERENTE) {
            throw new NotFoundException(`Funcionário não autorizado`);
        }

        const cliente = this.clienteRepo.create({
            ...criarClienteDto,
            gerente,
        });

        gerente.clientes.push(cliente);

        await this.clienteRepo.save(cliente);

        await this.repo.save(gerente);

        return cliente;

    }

    async abrirConta(idGerente: UUID, clienteId: UUID, conta: ContaEntity): Promise<ClienteEntity> {
        const gerente = await this.buscarPorId(idGerente);

        if (gerente.cargo !== TipoCargo.GERENTE) {
            throw new NotFoundException(`Funcionário não autorizado`);
        }

        const cliente = await this.clienteRepo.findOneBy(
            { id: clienteId },
        );
        if (!cliente) {
            throw new NotFoundException(`Cliente ${clienteId} não encontrado`);
        }

        // cliente.contas.push(conta);
        return this.clienteRepo.save(cliente);
    }

}