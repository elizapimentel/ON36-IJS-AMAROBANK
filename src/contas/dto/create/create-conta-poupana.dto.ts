import { CreateContaDto } from "./create-conta.dto";

export class CreateContaPoupancaDto  extends CreateContaDto {
    readonly taxaJuros: number;
}