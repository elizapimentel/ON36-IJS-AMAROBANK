import { Injectable, NotFoundException } from '@nestjs/common';
import { Funcionario, TipoCargo } from './entities/funcionario.entity';
import * as path from 'path';
import * as fs from 'fs';
import { Agente } from './entities/agente.entity';
import { Gerente } from './entities/gerente.entity';

@Injectable()
export class FuncionariosService {
  findOne(id: number): Funcionario {
    throw new Error('Method not implemented.');
  }
    private readonly filePath = path.resolve('src/funcionarios/funcionarios.json');
    // private idCounter: number; //id para contabilizar registros enquanto não possui BD
  
    //metodo para manipulação de dados
    private readFuncionarios(): Funcionario[] {
        const data = fs.readFileSync(this.filePath, 'utf8');
        return JSON.parse(data) as Funcionario[];
    }

    private writeFuncionarios(funcionarios: Funcionario[]): void {
        fs.writeFileSync(this.filePath, JSON.stringify(funcionarios, null, 2), 'utf8');
    }

    //create
    cadastrarFuncionario(nomeFuncionario: string, cargo: TipoCargo,  telefones: string[]): Funcionario {
        const funcionarios = this.readFuncionarios();
    const id = funcionarios.length > 0 ? funcionarios[funcionarios.length - 1].id + 1 : 1;
    
    let novoFuncionario: Funcionario;

    if (cargo === TipoCargo.AGENTE) {
      novoFuncionario = new Agente(id, nomeFuncionario, cargo, telefones, true);
    } else if (cargo === TipoCargo.GERENTE) {
      novoFuncionario = new Gerente(id, nomeFuncionario, cargo, telefones, true, []);
    } else {
      novoFuncionario = new Funcionario(id, nomeFuncionario, cargo, telefones);
    }

    funcionarios.push(novoFuncionario);
    this.writeFuncionarios(funcionarios);
    return novoFuncionario;
    }

    findAll(): Funcionario[] {
        return this.readFuncionarios();
    }

    //update
    atualizarFuncionario(id: number, nomeFuncionario: string, cargo: TipoCargo, telefones: string[]): Funcionario {
      const funcionarios = this.readFuncionarios();
      const funcionarioIndex = funcionarios.findIndex(f => f.id === id);
  
      if (!id) {
        throw new NotFoundException(`Funcionario with ID ${id} not found`);
      }
  
      let funcionario = funcionarios[funcionarioIndex];
  
      if (cargo === TipoCargo.AGENTE) {
        funcionario = new Agente(id, nomeFuncionario, cargo, telefones, true);
      } else if (cargo === TipoCargo.GERENTE) {
        funcionario = new Gerente(id, nomeFuncionario, cargo, telefones, true, []);
      } else {
        funcionario = new Funcionario(id, nomeFuncionario, cargo, telefones);
      }
  
      funcionarios[funcionarioIndex] = funcionario;
      this.writeFuncionarios(funcionarios);
      return funcionario;
    }

    // Delete
  removerFuncionario(id: number): void {
    const funcionarios = this.readFuncionarios();
    const updatedFuncionarios = funcionarios.filter(f => f.id !== id);

    if (funcionarios.length === updatedFuncionarios.length) {
      throw new NotFoundException(`Funcionario with ID ${id} not found`);
    }

    this.writeFuncionarios(updatedFuncionarios);
  }

  // get by id
  findById(id: number): Funcionario {
    const funcionarios = this.readFuncionarios();
    const funcionario = funcionarios.find(f => f.id === id);

    if (!funcionario) {
      throw new NotFoundException(`Funcionario with ID ${id} not found`);
    }

    return funcionario;
  }

  //get by cargo
  /* findByCargo(cargo: TipoCargo): Funcionario[] {
    const funcionarios = this.readFuncionarios();
    return funcionarios.filter(f => f.cargo === cargo);
  } */


   
}
