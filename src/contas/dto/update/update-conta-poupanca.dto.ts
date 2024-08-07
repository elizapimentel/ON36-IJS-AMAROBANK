import { PartialType } from '@nestjs/mapped-types';
import { CreateContaPoupancaDto } from '../create/create-conta-poupana.dto';

export class UpdateContaPoupancaDto extends PartialType(CreateContaPoupancaDto) {}