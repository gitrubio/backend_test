import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from 'src/users/entities/user.entity';
import { ActiveUser } from './decorators/active-user.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

/*
  This controller is responsible for handling all the authentication related routes.
  It contains two routes:
  - POST /auth/register: This route is responsible for registering a new user.
  - POST /auth/login: This route is responsible for logging in a user.
*/
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @ApiBearerAuth()
  @Get('revalidateToken')
  @UseGuards(AuthGuard)
  revalidate(@ActiveUser() user: User) {
    return this.authService.revalidateToken(user);
  }

  @ApiBearerAuth()
  @Post('updatePassword')
  @UseGuards(AuthGuard)
  update(
    @ActiveUser() user: User,
    @Body('password') password: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.updatePassword(user, password, newPassword);
  }
}
