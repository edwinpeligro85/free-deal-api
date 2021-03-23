import { AuthModule } from './auth/auth.module';
import { LocateModule } from './locate/locate.module';
import { MerchantModule } from './merchant/merchant.module';
import { UserModule } from './user/user.module';

export const FeactureModules = [
    AuthModule,
    UserModule,
    LocateModule,
    MerchantModule
];