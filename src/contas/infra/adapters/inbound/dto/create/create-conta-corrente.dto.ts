import { CreateContaDto } from './create-conta.dto';

export class CreateContaCorrenteDto extends CreateContaDto {
  limiteChequeEspecial: number;
}
