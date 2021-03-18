import { CustomBaseEntity } from 'src/base-entity';
import { Address } from 'src/modules/locate/address/entities/address.entity';
import { Column, JoinColumn, OneToOne } from 'typeorm';

export class BaseCompany extends CustomBaseEntity {
  @Column({ name: 'business_name', type: 'varchar', length: 192 })
  businessName: string;

  @Column({ name: 'business_phone', type: 'varchar', length: 15, nullable: true })
  businessPhone?: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  nit?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  brand?: string;

  @OneToOne(() => Address, { cascade: true, eager: true })
  @JoinColumn()
  address: Address;
}
