import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    // registering PassportModule and setting default strategy
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // registering Jwtmodule and setting secret and expiration time
    JwtModule.register({
      secret: 'secret',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  // so Jwt strategy is available in our auth module, just like service
  providers: [AuthService, JwtStrategy],
  // so that we can use JwtStrategy and Passport module in any other module 
  exports:[JwtStrategy, PassportModule]
})
export class AuthModule {}
