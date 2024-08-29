import { ContaEntity } from '../../../../contas/infra/adapters/entities/conta.entity';
import { Column, PrimaryGeneratedColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
import { GerenteEntity } from '../../../../funcionarios/infra/adapters/entities/gerente.entity';

@Entity('clientes')
export class ClienteEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'clienteId' })
    id: string;

    @Column()
    nomeCompleto: string;

    @Column()
    endereco: string;

    @Column('simple-array')
    telefones: string[];

    @OneToMany(() => ContaEntity, conta => conta.cliente)
    contas: ContaEntity[];

    @ManyToOne(() => GerenteEntity, gerente => gerente.clientes)
    gerente: GerenteEntity;

}