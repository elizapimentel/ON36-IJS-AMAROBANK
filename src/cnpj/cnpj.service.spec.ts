import { Test, TestingModule } from '@nestjs/testing';
import { CnpjService } from './applications/services/cnpj.service';
import { ICnpjRepository } from './infra/repository/ICnpj.repository';
import { CnpjEntity } from './domain/models/cnpj.entity';

describe('CnpjService', () => {
  let service: CnpjService;
  let repo: ICnpjRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CnpjService,
        {
          provide: 'ICnpjRepository',
          useValue: {
            findByCnpj: jest.fn().mockResolvedValue({} as any),
          },
        },
        ],
    }).compile();

    service = module.get<CnpjService>(CnpjService);
    repo = module.get<ICnpjRepository>('ICnpjRepository');
  });

  it('deve receber informacoes do CNPJ pesquisado', async () => {
    const cnpj = '27865757000102';
    const result = await service.getCnpjInfo(cnpj);

    expect(result).toBeDefined();
    expect(repo.findByCnpj).toHaveBeenCalledWith(cnpj);
    expect(result).toBeInstanceOf(Object);

  });
});
