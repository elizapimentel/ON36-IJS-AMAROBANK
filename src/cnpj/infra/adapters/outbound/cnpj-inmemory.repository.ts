import { Injectable } from '@nestjs/common';
import { CnpjEntity } from '../../../domain/models/cnpj.entity';
import { ICnpjRepository } from '../../repository/ICnpj.repository';

@Injectable()
export class CnpjInMemoryRepository implements ICnpjRepository {
  private readonly cnpjs: CnpjEntity[] = [];

  async findByCnpj(cnpj: string): Promise<CnpjEntity> {
    const cnpjEntity = this.cnpjs.find((c) => c.cnpj === cnpj);

    if (!cnpjEntity) {
      throw new Error('CNPJ não encontrado'); 
    }

    return cnpjEntity;
  }

//   async save(cnpjEntity: CnpjEntity): Promise<void> {
//     this.cnpjs.push(cnpjEntity);
//   }
}