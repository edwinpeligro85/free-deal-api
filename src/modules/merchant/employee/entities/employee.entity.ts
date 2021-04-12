import { CustomBaseEntity } from "src/base-entity";
import { User } from "src/modules/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";

@Entity('employees')
export class Employee extends CustomBaseEntity {

    @Column({ type: 'varchar', length: 30, nullable: false })
    title: string;

    @Column({ name: 'hire_date', type: 'datetime', nullable: true })
    hireDate: Date;

    @OneToOne(() => User, { cascade: true, nullable: true})
    @JoinColumn()
    me: User;
}
