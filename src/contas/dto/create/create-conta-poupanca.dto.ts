import { CreateContaDto } from "./create-conta.dto";

export class CreateContaPoupancaDto  extends CreateContaDto {
    taxaJuros: number;
    ultimoCalculoJuros: Date;
}