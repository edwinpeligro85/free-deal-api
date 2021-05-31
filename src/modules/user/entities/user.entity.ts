import { AuditableEntity } from 'src/base-entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status';
import { hash } from 'bcrypt';
import { Gender } from 'src/common/enums/gender.enum';
import { Order } from 'src/modules/merchant/order/entities/order.entity';

@Entity('users')
export class User extends AuditableEntity {
  @Column({ name: 'first_name', type: 'varchar', length: 45, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 45, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false, select: false })
  password: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  dni: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  avatar: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.INACTIVE })
  status: UserStatus;

  @Column({ name: 'last_page', type: 'varchar', length: 192, nullable: true })
  lastPage: string;

  @Column({ name: 'birth_date', type: 'datetime', nullable: true })
  birthDate: Date;

  @Column({ name: 'last_access_on', type: 'datetime', nullable: true })
  lastAccessOn: Date;

  @Column({ type: 'enum', enum: Gender, nullable: true })
  gender: Gender;

  @OneToMany(() => Order, order => order.customer)
  orders: Order[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (!this.password) return;
  
    this.password = await hash(this.password, 10);
  }
}
