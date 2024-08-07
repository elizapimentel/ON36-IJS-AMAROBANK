import { TipoCargo } from '../entities/funcionario.entity';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateFuncionarioDto {
  @IsNotEmpty()
  @IsString()
  readonly nomeFuncionario: string;

  @IsNotEmpty()
  @IsEnum(TipoCargo)
  readonly cargo: TipoCargo;

  @IsNotEmpty()
  readonly telefones: string[];
}
