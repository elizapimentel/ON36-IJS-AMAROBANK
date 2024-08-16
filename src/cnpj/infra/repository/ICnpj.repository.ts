import { CnpjEntity } from '../../domain/models/cnpj.entity';

export interface ICnpjRepository {
  findByCnpj(cnpj: string): Promise<CnpjEntity | null>;
  // save(cnpjEntity: CnpjEntity): Promise<void>;
}