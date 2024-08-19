import { FuncionariosRepository } from '../../funcionarios/repository/funcionario.repository';
import { TipoCargo } from '../../common/enums/tipo-.banco.enum';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ClientesService } from '../application/service/clientes.service';
import { ClientesRepository } from '../infra/adapters/outbound/repository/clientes.repository';
import { Cliente } from '../domain/entities/cliente.entity';

jest.mock('crypto', () => ({
    randomUUID: jest.fn().mockReturnValue('123'),
}));

describe('ClientesService', () => {

    let clienteService: ClientesService;
    let clienteRepo: ClientesRepository;
    let funcionarioRepo: FuncionariosRepository;

    beforeEach(() => {
        clienteRepo = new ClientesRepository();
        funcionarioRepo = new FuncionariosRepository();
        clienteService = new ClientesService(clienteRepo, funcionarioRepo);
    });

    test('deve criar um cliente', async () => {

        const funcionarioEsperado = {
            id: '123',
            cargo: TipoCargo.GERENTE,
            nomeCompleto: 'Ana dos Santos',
            endereco: 'Rua 2, 456',
            telefones: ['(11) 99999-9999', '(11) 98888-8888'],
        };
        const clienteEsperado = new Cliente('Joao da Silva', 'Rua 1, 123', ['(11) 99999-9999', '(11) 98888-8888']);

        clienteService.cadastrarCliente = jest.fn().mockResolvedValue(clienteEsperado);
        funcionarioRepo.buscarGerentePorId = jest.fn().mockResolvedValue(funcionarioEsperado.id);
        const cliente = await clienteService.cadastrarCliente(
            funcionarioEsperado, {
            nomeCompleto: 'Joao da Silva',
            endereco: 'Rua 1, 123',
            telefones: ['(11) 99999-9999', '(11) 98888-8888'],
        });

        expect(cliente).toStrictEqual(clienteEsperado);

    });

    test('deve lançar exceção se funcionário não for gerente ao criar cliente', async () => {
        const funcionarioAgente = {
            id: '123',
            cargo: TipoCargo.AGENTE,
            nomeCompleto: 'Joao da Silva',
            endereco: 'Rua 1, 123',
            telefones: ['(11) 99999-9999', '(11) 98888-8888'],
        };

        const criarClienteDto = {
            nomeCompleto: 'Maria Oliveira',
            endereco: 'Rua 2, 456',
            telefones: ['(11) 98888-8888'],
        };

        await expect(clienteService.cadastrarCliente(funcionarioAgente, criarClienteDto))
            .rejects
            .toThrow(NotFoundException);
    });

    test('deve listar todos os clientes', () => {
        const clientesEsperados = [
            new Cliente('Joao da Silva', 'Rua 1, 123', ['(11) 99999-9999']),
            new Cliente('Maria Oliveira', 'Rua 2, 456', ['(11) 98888-8888']),
        ];

        jest.spyOn(clienteRepo, 'listarTodos').mockReturnValue(clientesEsperados);
        const resultado = clienteService.listarTodos();
        expect(resultado).toStrictEqual(clientesEsperados);
    });

    test('deve encontrar um cliente pelo ID', () => {
        const clienteEsperado = new Cliente('Joao da Silva', 'Rua 1, 123', ['(11) 99999-9999']);
        jest.spyOn(clienteRepo, 'encontrarPorId').mockReturnValue(clienteEsperado);

        const resultado = clienteService.encontrarPorId(clienteEsperado.id);
        expect(resultado).toStrictEqual(clienteEsperado);
    });

    test('deve lançar exceção se cliente não for encontrado pelo ID', () => {
        jest.spyOn(clienteRepo, 'encontrarPorId').mockReturnValue(null);

        expect(() => clienteService.encontrarPorId('123')).toThrow(NotFoundException);
    });

    test('deve atualizar as informações do cliente', () => {
        const clienteExistente = new Cliente('Joao da Silva', 'Rua 1, 123', ['(11) 99999-9999']);
        const clienteAtualizado = { ...clienteExistente, endereco: 'Rua 3, 789' };
        const updateClienteDto = { endereco: 'Rua 3, 789' };

        jest.spyOn(clienteRepo, 'encontrarPorId').mockReturnValue(clienteExistente);
        jest.spyOn(clienteRepo, 'salvar').mockReturnValue(clienteAtualizado);

        const resultado = clienteService.atualizarCliente('123', updateClienteDto);
        expect(resultado).toStrictEqual(clienteAtualizado);
    });

    test('deve lançar exceção se cliente não for encontrado para atualização', () => {
        jest.spyOn(clienteRepo, 'encontrarPorId').mockReturnValue(null);

        expect(() => clienteService.atualizarCliente('123', { endereco: 'Rua 3, 789' })).toThrow(NotFoundException);
    });

    test('deve remover um cliente', () => {
        const clienteExistente = new Cliente('Joao da Silva', 'Rua 1, 123', ['(11) 99999-9999']);
        clienteExistente.id = '123';

        jest.spyOn(clienteService, 'encontrarPorId').mockReturnValue(clienteExistente);

        const removerClienteSpy = jest.spyOn(clienteRepo, 'removerCliente').mockImplementation(() => { });

        clienteService.removerCliente(clienteExistente.id);

        expect(removerClienteSpy).toHaveBeenCalledWith('123');
    });


});
