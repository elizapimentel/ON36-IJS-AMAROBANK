import { IsEnum } from 'class-validator';
import { TipoCargo } from '../../common/enums/tipo-.banco.enum';

export class FindFuncionariosByCargoDto {
  @IsEnum(TipoCargo)
  cargo: TipoCargo;
}
