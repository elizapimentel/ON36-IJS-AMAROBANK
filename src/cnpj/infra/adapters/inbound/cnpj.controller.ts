import { Controller, Get, Param } from '@nestjs/common';
import { CnpjService } from '../../../applications/services/cnpj.service';
import { CnpjEntity } from '../../../domain/models/cnpj.entity';

@Controller('cnpj')
export class CnpjController {
  constructor(private readonly cnpjService: CnpjService) { }

  @Get(':cnpj')
  async getCnpj(@Param('cnpj') cnpj: string): Promise<CnpjEntity> {
    return await this.cnpjService.getCnpjInfo(cnpj);
  }

}
