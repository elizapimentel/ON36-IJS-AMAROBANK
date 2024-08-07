import { PartialType } from '@nestjs/mapped-types';
import { CreateContaDto } from '../create/create-conta.dto';

export class UpdateContaDto extends PartialType(CreateContaDto) {}
