import { IsEnum } from 'class-validator';
import { TipoCargo } from '../entities/funcionario.entity';

export class FindFuncionariosByCargoDto {
  @IsEnum(TipoCargo)
  cargo: TipoCargo;
}