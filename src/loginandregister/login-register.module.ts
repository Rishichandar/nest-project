
// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { LoginRegisterController } from './login-register.controller';
// import { LoginRegisterService } from './login-register.service';
// import { UserSchema } from './login-register.schema';
// import { JwtAuthGuard } from '../guards/jwt-auth.guard'; // Import JwtAuthGuard

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
//   ],
//   controllers: [LoginRegisterController],
//   providers: [LoginRegisterService, JwtAuthGuard], // Service responsible for user operations ,Guard to protect routes
//   exports: [JwtAuthGuard], 
// })
// export class LoginRegisterModule {}


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoginRegisterController } from './login-register.controller';
import { LoginRegisterService } from './login-register.service';
import { UserSchema } from './login-register.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [LoginRegisterController],
  providers: [LoginRegisterService],
})
export class LoginRegisterModule {}
