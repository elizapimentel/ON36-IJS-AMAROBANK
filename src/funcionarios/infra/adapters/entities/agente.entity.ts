import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { FuncionarioEntity } from './funcionario.entity';
import { TipoCargo } from '../../../../common/enums/tipo-.banco.enum';

@Entity('agente')
export class AgenteEntity extends FuncionarioEntity {
   
    @Column({
        type: 'enum',
        enum: TipoCargo,
        default: TipoCargo.AGENTE,
    })
    cargo: TipoCargo;

    constructor(partial: Partial<AgenteEntity>) {
        super(partial);
        Object.assign(this, partial);
    }
}