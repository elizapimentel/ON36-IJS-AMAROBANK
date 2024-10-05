import { Test, TestingModule } from '@nestjs/testing';
import { TipoCargo } from '../../common/enums/tipo-.banco.enum';
import { FuncionariosService } from '../application/ports/input/service/funcionarios.service';
import { Agente } from '../domain/entities/agente.entity';
import { Gerente } from '../domain/entities/gerente.entity';
import { FuncionariosFactory } from '../domain/factory/funcionarios.factory';
import { CreateFuncionarioDto } from '../infra/adapters/inbound/dto/create-funcionario.dto';
import { FuncionariosRepository } from '../infra/adapters/outbound/repository/funcionario.repository';



describe('FuncionariosService', () => {
  let funcionariosService: FuncionariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FuncionariosService,
        FuncionariosRepository,
        FuncionariosFactory,
      ],
    }).compile();

    funcionariosService = module.get<FuncionariosService>(FuncionariosService);
  });

  test('deve criar um Agente', () => {
    const funcionarioDto: CreateFuncionarioDto = {
      cargo: TipoCargo.AGENTE,
      nomeCompleto: 'Carlos Pereira',
      endereco: 'Rua 3, 456',
      telefones: ['(21) 98765-4321'],
      clientes: [],
    };

    const createdFuncionario = funcionariosService.cadastrarFuncionario(
      TipoCargo.AGENTE,
      funcionarioDto,
    );

    expect(createdFuncionario).toBeInstanceOf(Agente);
    expect(createdFuncionario.cargo).toBe(TipoCargo.AGENTE);
    expect(createdFuncionario.nomeCompleto).toBe('Carlos Pereira');
  });

  test('deve criar um Gerente', () => {
    const funcionarioDto: CreateFuncionarioDto = {
      cargo: TipoCargo.GERENTE,
      nomeCompleto: 'Ana Souza',
      endereco: 'Rua 4, 789',
      telefones: ['(11) 99887-6655'],
      clientes: [],
    };

    const createdFuncionario = funcionariosService.cadastrarFuncionario(
      TipoCargo.GERENTE,
      funcionarioDto,
    );

    expect(createdFuncionario).toBeInstanceOf(Gerente);
    expect(createdFuncionario.cargo).toBe(TipoCargo.GERENTE);
    expect(createdFuncionario.nomeCompleto).toBe('Ana Souza');
  });

  test('deve retornar todos os funcionarios', () => {
    const funcionarioDto1: CreateFuncionarioDto = {
      cargo: TipoCargo.AGENTE,
      nomeCompleto: 'Carlos Pereira',
      endereco: 'Rua 3, 456',
      telefones: ['(21) 98765-4321'],
      clientes: [],
    };

    const funcionarioDto2: CreateFuncionarioDto = {
      cargo: TipoCargo.GERENTE,
      nomeCompleto: 'Ana Souza',
      endereco: 'Rua 4, 789',
      telefones: ['(11) 99887-6655'],
      clientes: [],
    };

    funcionariosService.cadastrarFuncionario(TipoCargo.AGENTE, funcionarioDto1);
    funcionariosService.cadastrarFuncionario(TipoCargo.GERENTE, funcionarioDto2);

    const funcionarios = funcionariosService.findAll();

    expect(funcionarios.length).toBe(2);
    expect(funcionarios[0]).toBeInstanceOf(Agente);
    expect(funcionarios[1]).toBeInstanceOf(Gerente);
  });

  test('deve retornar um Gerente por ID', () => {
    const funcionarioDto: CreateFuncionarioDto = {
      cargo: TipoCargo.GERENTE,
      nomeCompleto: 'Lucas Ribeiro',
      endereco: 'Rua 5, 987',
      telefones: ['(31) 98547-1234'],
      clientes: [],
    };

    const createdFuncionario = funcionariosService.cadastrarFuncionario(
      TipoCargo.GERENTE,
      funcionarioDto,
    );

    const foundGerente = funcionariosService.findGerenteById(createdFuncionario.id as string);

    expect(foundGerente).toBeInstanceOf(Gerente);
    expect(foundGerente?.nomeCompleto).toBe('Lucas Ribeiro');
  });

  test('deve retornar qualquer Funcionario por ID', () => {
    const funcionarioDto: CreateFuncionarioDto = {
      cargo: TipoCargo.AGENTE,
      nomeCompleto: 'Pedro Costa',
      endereco: 'Rua 6, 321',
      telefones: ['(11) 98777-6655'],
      clientes: [],
    };

    const createdFuncionario = funcionariosService.cadastrarFuncionario(
      TipoCargo.AGENTE,
      funcionarioDto,
    );

    const foundFuncionario = funcionariosService.findFuncionarioById(createdFuncionario.id as string);

    expect(foundFuncionario).toBeInstanceOf(Agente);
    expect(foundFuncionario?.nomeCompleto).toBe('Pedro Costa');
  });
});
