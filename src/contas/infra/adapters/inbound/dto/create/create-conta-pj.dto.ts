
import { CreateContaCorrenteDto } from './create-conta-corrente.dto';

export class CreateContaPJDto extends CreateContaCorrenteDto {
  cnpj: string;
}