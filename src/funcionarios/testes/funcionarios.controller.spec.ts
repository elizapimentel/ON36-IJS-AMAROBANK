import { INestApplication } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import * as supertest from 'supertest';
import { AppModule } from '../../app.module';
import { TipoCargo } from '../../common/enums/tipo-.banco.enum';

describe('FuncionariosController', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleRef: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    test('deve criar um Agente', async () => {
        const cargo = TipoCargo.AGENTE;
        const funcionario = {
            nomeCompleto: 'Carlos Pereira',
            endereco: 'Rua 3, 456',
            telefones: ['(21) 98765-4321'],
        };

        return supertest(app.getHttpServer())
            .post('/funcionarios')
            .send({ cargo, funcionario })
            .expect(201)
            .expect(({ body }) => {
                body.nomeCompleto === funcionario.nomeCompleto;
                body.endereco === funcionario.endereco;
                body.telefones === funcionario.telefones;
                body.cargo === TipoCargo.AGENTE;
            });
    });

    test('deve criar um Gerente', async () => {
        const cargo = TipoCargo.GERENTE;
        const funcionario = {
            nomeCompleto: 'Ana Souza',
            endereco: 'Rua 4, 789',
            telefones: ['(11) 99887-6655'],
            clientes: [],
        };

        return supertest(app.getHttpServer())
            .post('/funcionarios')
            .send({ cargo, funcionario })
            .expect(201)
            .expect(({ body }) => {
                body.nomeCompleto === funcionario.nomeCompleto;
                body.endereco === funcionario.endereco;
                body.telefones === funcionario.telefones;
                body.cargo === cargo;
                body.clientes === funcionario.clientes;
            });
    });

    test('deve retornar todos os funcionarios', async () => {
        return supertest(app.getHttpServer())
            .get('/funcionarios')
            .expect(200)
            .expect(({ body }) => {
                expect(Array.isArray(body)).toBe(true);
                
            });
    });

    test('should return a Gerente by ID', async () => {
        const id = 'dd8d8b0a-dd24-4920-a19e-0aa5d3424471';

        return supertest(app.getHttpServer())
            .get(`/funcionarios/${id}`)
            .expect(200)
            .expect(({ body }) => {
                body.cargo === TipoCargo.GERENTE;
            });
    });

    test('should return a Funcionario by ID', async () => {
       const id = 'dd8d8b0a-dd24-4920-a19e-0aa5d3424471';
        return supertest(app.getHttpServer())
            .get(`/funcionarios/${id}`)
            .expect(200)
            .expect(({ body }) => {
                body.cargo === TipoCargo.GERENTE || body.cargo === TipoCargo.AGENTE;
            });
    });
});
