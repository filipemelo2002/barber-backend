import { Module } from '@nestjs/common';
import { JWTService } from './jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { JWTAuthenticationService } from '@app/services/jwt-authentication-service';
import { AuthAdmin } from '@app/use-cases/auth-admin';
import { DatabaseModule } from '@infra/database/database.module';

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
  ],
  exports: [JWTAuthenticationService, AuthAdmin],
})
export class AuthModule {}
