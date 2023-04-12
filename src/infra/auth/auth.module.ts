import { Module } from '@nestjs/common';
import { JWTService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTAuthenticationService } from '@app/services/jwt-authentication-service';
import { AuthAdmin } from '@app/use-cases/auth-admin';
import { DatabaseModule } from '@infra/database/database.module';
import { AdminGuard } from './admin.guard';
import { AdminCustomerGuard } from './admin-customer.guard';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '2 days',
      },
    }),
  ],
  providers: [
    {
      provide: JWTAuthenticationService,
      useClass: JWTService,
    },
    AuthAdmin,
    AdminGuard,
    AdminCustomerGuard,
  ],
  exports: [
    JWTAuthenticationService,
    AuthAdmin,
    AdminGuard,
    AdminCustomerGuard,
  ],
})
export class AuthModule {}
