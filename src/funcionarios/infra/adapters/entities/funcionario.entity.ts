import { Column, PrimaryGeneratedColumn, Entity, TableInheritance } from 'typeorm';
import { TipoCargo } from '../../../../common/enums/tipo-.banco.enum';
import { UUID } from 'crypto';

@Entity('funcionarios')
@TableInheritance({ column: { type: 'varchar', name: 'tipoCargo' } })
export class FuncionarioEntity {
    @PrimaryGeneratedColumn('uuid')
    id: UUID;

    @Column()
    nomeCompleto: string;

    @Column()
    endereco: string;

    @Column('simple-array')
    telefones: string[];

    @Column({
        type: 'enum',
        enum: TipoCargo,
    })
    cargo: TipoCargo;

    // esse construtor serve para que possamos passar um objeto parcial para a entidade
    constructor(partial: Partial<FuncionarioEntity>) {
        Object.assign(this, partial);
    }

}