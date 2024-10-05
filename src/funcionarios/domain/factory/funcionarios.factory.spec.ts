import { AgenteEntity } from "../../../funcionarios/infra/adapters/entities/agente.entity";
import { TipoCargo } from "../../../common/enums/tipo-.banco.enum";
import { CreateFuncionarioDto } from "../../../funcionarios/infra/adapters/inbound/dto/create-funcionario.dto";
import { FuncionariosFactory } from "./funcionarios.factory";
import { GerenteEntity } from "../../../funcionarios/infra/adapters/entities/gerente.entity";


describe('FuncionariosFactory', () => {

  let funcionariosFactory: FuncionariosFactory;
  let funcionarioDto: CreateFuncionarioDto;

  beforeEach(() => {
    funcionariosFactory = new FuncionariosFactory();
    funcionarioDto = {
      cargo: TipoCargo.AGENTE,
      nomeCompleto: 'Maria da Silva',
      endereco: 'Rua 2, 123',
      telefones: ['(11) 98765-4321'],
      clientes: [],
    };
  });

  test('deve criar um Agente', () => {
    const retornado = funcionariosFactory.criarFuncionario(
      TipoCargo.AGENTE,
      funcionarioDto,
    );

    expect(retornado).toBeInstanceOf(AgenteEntity);
    expect(retornado.nomeCompleto).toBe('Maria da Silva');
    expect(retornado.endereco).toBe('Rua 2, 123');
    expect(retornado.telefones).toEqual(['(11) 98765-4321']);
  });

  test('deve criar um Gerente', () => {
    funcionarioDto.cargo = TipoCargo.GERENTE;

    const retornado = funcionariosFactory.criarFuncionario(
      TipoCargo.GERENTE,
      funcionarioDto,
    );

    expect(retornado).toBeInstanceOf(GerenteEntity);
    expect(retornado.nomeCompleto).toBe('Maria da Silva');
    expect(retornado.endereco).toBe('Rua 2, 123');
    expect(retornado.telefones).toEqual(['(11) 98765-4321']);
  });

  test('deve retornar um erro quando tipo inválido', () => {
    expect(() => {
      funcionariosFactory.criarFuncionario('INVALIDO' as TipoCargo, funcionarioDto);
    }).toThrowError('Cargo inválido');
  });
});
