import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CnpjEntity } from '../../../domain/models/cnpj.entity';
import { ICnpjRepository } from '../../repository/ICnpj.repository';

@Injectable()
export class CnpjRepositoryImpl implements ICnpjRepository {
    constructor(private readonly httpService: HttpService) { }

    async findByCnpj(cnpj: string): Promise<CnpjEntity> {
        const url = `https://brasilapi.com.br/api/cnpj/v1/${cnpj}`;
        const response = await firstValueFrom(this.httpService.get(url));
        const data = response.data;
        return new CnpjEntity(data.cnpj, data.razao_social, data.nome_fantasia);
    }
    
    // async save(cnpjEntity: CnpjEntity): Promise<void> {
    //     throw new Error('Metodo não implementado.');
    // }
}