import { FuncionariosFactory } from '../funcionarios/funcionarios.factory';
import { CreateFuncionarioDto } from '../../funcionarios/dto/create-funcionario.dto';
import { TipoCargo } from '../../../common/enums/tipo-.banco.enum';
import { Agente } from '../../funcionarios/entities/agente.entity';
import { Gerente } from '../../funcionarios/entities/gerente.entity';

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

    expect(retornado).toBeInstanceOf(Agente);
    expect(retornado.cargo).toBe(TipoCargo.AGENTE);
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

    expect(retornado).toBeInstanceOf(Gerente);
    expect(retornado.cargo).toBe(TipoCargo.GERENTE);
    expect(retornado.nomeCompleto).toBe('Maria da Silva');
    expect(retornado.endereco).toBe('Rua 2, 123');
    expect(retornado.telefones).toEqual(['(11) 98765-4321']);
    expect(retornado.clientes).toEqual([]); // Verifica se a lista de clientes foi inicializada corretamente
  });

  test('deve retornar um erro quando tipo inválido', () => {
    expect(() => {
      funcionariosFactory.criarFuncionario('INVALIDO' as TipoCargo, funcionarioDto);
    }).toThrowError('Cargo inválido');
  });
});
