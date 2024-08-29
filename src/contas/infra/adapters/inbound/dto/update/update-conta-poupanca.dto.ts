import { PartialType } from '@nestjs/mapped-types';
import { CreateContaPoupancaDto } from '../create/create-conta-poupanca.dto';

export class UpdateContaPoupancaDto extends PartialType(CreateContaPoupancaDto) { }