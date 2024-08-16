import { Inject, Injectable } from '@nestjs/common';
import { ICnpjRepository } from '../../infra/repository/ICnpj.repository';
import { CnpjEntity } from '../../domain/models/cnpj.entity';

@Injectable()
export class CnpjService {
  constructor(
    @Inject('ICnpjRepository')
    private readonly cnpjRepository: ICnpjRepository
  ) { }

  async getCnpjInfo(cnpj: string): Promise<CnpjEntity> {
    return await this.cnpjRepository.findByCnpj(cnpj);
  }
}
