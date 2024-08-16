import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CnpjService } from './applications/services/cnpj.service';
import { CnpjController } from './infra/adapters/inbound/cnpj.controller';
import { CnpjRepositoryImpl } from './infra/adapters/outbound/cnpjImpl.repository';

@Module({
  imports: [HttpModule],
  controllers: [CnpjController],
  providers: [
    CnpjService,
    {
      provide: 'ICnpjRepository',
      useClass: CnpjRepositoryImpl, // ou useClass: CnpjInMemoryRepository
    },
  ],
})
export class CnpjModule { }
