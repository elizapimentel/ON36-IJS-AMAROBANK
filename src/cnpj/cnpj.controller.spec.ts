import { Test, TestingModule } from '@nestjs/testing';
import { CnpjController } from './cnpj.controller';
import { CnpjService } from './cnpj.service';

describe('CnpjController', () => {
  let controller: CnpjController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CnpjController],
      providers: [CnpjService],
    }).compile();

    controller = module.get<CnpjController>(CnpjController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
