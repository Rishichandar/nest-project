
import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException, UseGuards, Get } from '@nestjs/common';
import { LoginRegisterService } from './login-register.service';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from '../guards/jwt-auth.guard'; // Import JwtAuthGuard
import { generateToken } from '../helper/jwt.helper'; // Import your JWT helper function

@Controller('auth')
export class LoginRegisterController {
  constructor(
    private readonly loginRegisterService: LoginRegisterService
  ) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: { email: string; username: string; password: string }) {
    const { email, username, password } = body;
    return this.loginRegisterService.register(email, username, password);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const user = await this.loginRegisterService.findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, userId: user._id };
    const token = generateToken(payload);

    return { token };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() body: { email: string; newPassword: string }) {
    const { email, newPassword } = body;
    return this.loginRegisterService.resetPassword(email, newPassword);
  }

  @Get('protected-data')
  @UseGuards(JwtAuthGuard)
  async getProtectedData() {
    return { message: 'This data is protected and requires a valid JWT token to access' };
  }

  @Get('users')
  @UseGuards(JwtAuthGuard) // Protect this route with JwtAuthGuard
  async getAllUsers() {
    return this.loginRegisterService.getAllUsers();
  }

}
