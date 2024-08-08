import { Injectable, NotFoundException } from '@nestjs/common';
import { Funcionario } from '../entities/funcionario.entity';
import * as path from 'path';
import * as fs from 'fs';
import { CreateFuncionarioDto } from '../dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from '../dto/update-funcionario.dto';
import { TipoCargo } from 'src/common/enums/tipo-.conta.enum';
import { FuncionariosFactory } from 'src/factories/funcionarios.factory';

@Injectable()
export class FuncionariosService {
  private readonly filePath = path.resolve(
    'src/funcionarios/funcionarios.json',
  );
  private idCounter: number;

  constructor() {
    const funcionarios = this.readFuncionarios();
    this.idCounter =
      funcionarios.length > 0
        ? funcionarios[funcionarios.length - 1].id + 1
        : 1;
  }

  //metodo para manipulação de dados
  private readFuncionarios(): Funcionario[] {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data) as Funcionario[];
  }

  private writeFuncionarios(funcionarios: Funcionario[]): void {
    fs.writeFileSync(
      this.filePath,
      JSON.stringify(funcionarios, null, 2),
      'utf8',
    );
  }

  cadastrarFuncionario(criarFuncionario: CreateFuncionarioDto): Funcionario {
    const funcionarios = this.readFuncionarios();
    let novoFuncionario: Funcionario;

    if (criarFuncionario.cargo === TipoCargo.GERENTE) {
      novoFuncionario = FuncionariosFactory.criarFuncionario(
        TipoCargo.GERENTE,
        this.idCounter++,
        criarFuncionario.nomeFuncionario,
        criarFuncionario.telefones,
        [],
      );
    } 
    
    if (criarFuncionario.cargo === TipoCargo.AGENTE) {
      novoFuncionario = FuncionariosFactory.criarFuncionario(
        TipoCargo.AGENTE,
        this.idCounter++,
        criarFuncionario.nomeFuncionario,
        criarFuncionario.telefones,
      );
    }
    
    funcionarios.push(novoFuncionario);
    this.writeFuncionarios(funcionarios);
    return novoFuncionario;
  }

  findAll(): Funcionario[] {
    return this.readFuncionarios();
  }

  //update
  atualizarDadosFuncionario(
    id: number,
    updateFuncionario: UpdateFuncionarioDto,
  ): Funcionario {
    const funcionarios = this.readFuncionarios();
    const funcionarioIndex = funcionarios.findIndex((f) => f.id === id);

    if (funcionarioIndex === -1) {
      throw new NotFoundException(`Funcionario com ID ${id} não encontrado`);
    }

    const atualizarFuncionario = {
      ...funcionarios[funcionarioIndex],
      ...updateFuncionario,
    };
    funcionarios[funcionarioIndex] = atualizarFuncionario;
    this.writeFuncionarios(funcionarios);
    return atualizarFuncionario;
  }

  // Delete
  removerFuncionario(id: number): void {
    const funcionarios = this.readFuncionarios();
    const updatedFuncionarios = funcionarios.filter((f) => f.id !== id);

    if (funcionarios.length === updatedFuncionarios.length) {
      throw new NotFoundException(`Funcionario com ID ${id} não encontrado`);
    }

    funcionarios.splice(id, 1);
    this.writeFuncionarios(updatedFuncionarios);
  }

  // get by id
  findById(id: number): Funcionario {
    const funcionarios = this.readFuncionarios();
    const funcionarioIndex = funcionarios.findIndex((f) => f.id === id);

    if (funcionarioIndex === -1) {
      throw new NotFoundException(`Funcionario with ID ${id} not found`);
    }

    return funcionarios[funcionarioIndex];
  }
}
