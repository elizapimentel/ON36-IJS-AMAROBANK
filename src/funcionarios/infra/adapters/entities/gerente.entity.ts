import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { FuncionarioEntity } from './funcionario.entity';
import { ClienteEntity } from '../../../../clientes/infra/adapters/entities/cliente.entity';
import { TipoCargo } from '../../../../common/enums/tipo-.banco.enum';

@Entity('gerente')
export class GerenteEntity extends FuncionarioEntity {

    @Column({
        type: 'enum',
        enum: TipoCargo,
        default: TipoCargo.GERENTE,
    })
    cargo: TipoCargo;

    @OneToMany(() => ClienteEntity, cliente => cliente.gerente, {
        cascade: true,
        eager: true
    })
    clientes: ClienteEntity[];

    constructor(partial: Partial<GerenteEntity>) {
        super(partial);
        Object.assign(this, partial);
    }
}