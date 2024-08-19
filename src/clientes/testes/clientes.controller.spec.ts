import { Test, TestingModule } from '@nestjs/testing';
import { Gerente } from '../../funcionarios/entities/gerente.entity';
import { TipoCargo } from '../../common/enums/tipo-.banco.enum';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../app.module';
import * as request from 'supertest';
import { ClientesController } from '../infra/adapters/inbound/controller/clientes.controller';
import { ClientesService } from '../application/service/clientes.service';
import { Cliente } from '../domain/entities/cliente.entity';
import { CreateClienteDto } from '../domain/dto/create-cliente.dto';
import { UpdateClienteDto } from '../domain/dto/update-cliente.dto';

describe('Clientes Controller', () => {
  let controller: ClientesController;
  let service: ClientesService;
  let app: INestApplication;

  const mockGerente: Gerente = new Gerente(
    TipoCargo.GERENTE,
    'Joao Correa',
    'Rua 1',
    ['123456789'],
    []
  );
  mockGerente.id = 'gerente-id';

  const mockCliente: Cliente = new Cliente(
    'João da Silva',
    'Rua 123',
    ['987654321']
  );
  mockCliente.gerente = mockGerente;
  mockCliente.id = 'cliente-id';

  const mockClientes: any[] = [
    {
      id: 'cliente-id',
      nomeCompleto: 'João da Silva',
      endereco: 'Rua 123',
      telefones: ['987654321'],
      gerente: {
        id: 'gerente-id',
        nomeCompleto: 'Joao Correa',
        endereco: 'Rua 1',
        telefones: ['123456789'],
        cargo: 'GERENTE',
        clientes: [],
      },
    },
    {
      id: 'cliente-id-2',
      nomeCompleto: 'Maria Souza',
      endereco: 'Rua 456',
      telefones: ['123456789'],
      gerente: null,
    },
  ];

  const mockCreateClienteDto: CreateClienteDto = {
    nomeCompleto: 'João da Silva',
    endereco: 'Rua 123',
    telefones: ['987654321'],
    gerenteId: 'gerente-id',
  };

  const mockUpdateClienteDto: UpdateClienteDto = {
    nomeCompleto: 'João da Silva',
    endereco: 'Rua 123',
    telefones: ['987654321', '123456789'],
    gerenteId: 'gerente-id',
  };

  const mockCliente2: Cliente = {
    id: 'cliente-id',
    nomeCompleto: 'João da Silva',
    endereco: 'Rua 123',
    telefones: ['987654321', '123456789'],
    gerente: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [ClientesController],
      providers: [
        {
          provide: ClientesService,
          useValue: {
            cadastrarCliente: jest.fn().mockResolvedValue(mockCliente),
            listarTodos: jest.fn().mockResolvedValue(mockClientes),
            encontrarPorId: jest.fn().mockResolvedValue(mockCliente),
            atualizarCliente: jest.fn().mockResolvedValue(mockCliente2),
            removerCliente: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    controller = module.get<ClientesController>(ClientesController);
    service = module.get<ClientesService>(ClientesService);

    app = module.createNestApplication();
    await app.init();
  });

  test('deve criar um cliente', async () => {
    const result = await controller.create(mockCreateClienteDto, mockGerente);

    return request(app.getHttpServer())
      .post('/clientes')
      .send(result)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(mockCliente);
      });
  });

  test('deve listar todos os clientes', () => {
    return request(app.getHttpServer())
      .get('/clientes')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(mockClientes);
      });
  });

  test('deve encontrar um cliente por id', () => {
    return request(app.getHttpServer())
      .get(`/clientes/${mockCliente.id}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(mockCliente);
      });
  });

  test('deve atualizar um cliente', () => {
    return request(app.getHttpServer())
      .patch(`/clientes/${mockCliente.id}`)
      .send(mockUpdateClienteDto)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(mockCliente2);
      });
  });

  test('deve remover um cliente', () => {
    return request(app.getHttpServer())
      .delete(`/clientes/${mockCliente.id}`)
      .expect(200);
  });
    

});