import {
    Body,
    Controller,
    Get,
    Param,
    Post,
} from '@nestjs/common';
import { UUID } from 'crypto';
import { GerenteEntity } from '../../entities/gerente.entity';
import { IGerenteService } from '../../../../../funcionarios/application/ports/input/service/IGerente.service';
import { CreateClienteDto } from '../../../../../clientes/infra/adapters/inbound/dto/create-cliente.dto';
import { ClienteEntity } from '../../../../../clientes/infra/adapters/entities/cliente.entity';
import { ContaEntity } from '../../../../../contas/infra/adapters/entities/conta.entity';

@Controller('gerente')
export class GerenteController {
    constructor(
        private readonly gerenteService: IGerenteService,
    ) { }

    @Get(':id')
    findGerenteById(@Param('id') id: UUID): Promise<GerenteEntity | undefined> {
        return this.gerenteService.buscarPorId(id);
    }

    @Post(':id/cliente')
    cadastrarCliente(
        @Param('id') id: UUID,
        @Body() createClienteDto: CreateClienteDto
    ): Promise<ClienteEntity> {
        return this.gerenteService.cadastrarCliente(id, createClienteDto);
    }

    @Post(':id/cliente/:clienteId/conta')
    abrirConta(
        @Param('id') id: UUID,
        @Param('clienteId') clienteId: UUID,
        @Body() conta: ContaEntity
    ): Promise<ClienteEntity> {
        return this.gerenteService.abrirConta(id, clienteId, conta);
    }

}