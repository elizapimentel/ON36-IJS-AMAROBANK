import { CreateFuncionarioDto } from "../../../../../funcionarios/infra/adapters/inbound/dto/create-funcionario.dto";
import { TipoCargo } from "../../../../../common/enums/tipo-.banco.enum";
import { FuncionarioEntity } from "../../../../infra/adapters/entities/funcionario.entity";
import { UpdateFuncionarioDto } from "../../../../../funcionarios/infra/adapters/inbound/dto/update-funcionario.dto";

export interface IFuncionarioService {
    cadastrarFuncionario(type: TipoCargo, funcionario: CreateFuncionarioDto): Promise<FuncionarioEntity>;
    listarTodos(): Promise<FuncionarioEntity[]>;
    findFuncionarioById(id: string): Promise<FuncionarioEntity | undefined>;
    findFuncionarioByCargo(cargo: TipoCargo): Promise<FuncionarioEntity[]>;
    atualizarDadosFuncionario(id: string, updateFuncionario: UpdateFuncionarioDto): Promise<FuncionarioEntity>;
    removerFuncionario(id: string): Promise<void>;
}

export const IFuncionarioService = Symbol('IFuncionarioService');