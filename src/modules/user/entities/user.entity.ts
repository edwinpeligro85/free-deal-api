import { CustomBaseEntity } from 'src/base-entity';
import { Column, Entity } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status';

@Entity('users')
export class User extends CustomBaseEntity {
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

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.DRAFT })
  status: UserStatus;

  @Column({ name: 'last_page', type: 'varchar', length: 192, nullable: true })
  lastPage: string;

  @Column({ name: 'last_access_on', type: 'datetime', nullable: true })
  lastAccessOn: string;
}
