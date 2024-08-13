import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TipoCargo } from 'src/common/enums/tipo-.conta.enum';

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
