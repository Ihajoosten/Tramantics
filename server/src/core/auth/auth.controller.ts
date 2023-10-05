import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginUserDTO } from './dto/login-user.dto';
import { RegisterUserDTO } from './dto/register-user.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDTO,
  ): Promise<{ access_token: string }> {
    return this.authService.login(loginUserDto);
  }

  @Post('register')
  async register(
    @Body() registerUserDto: RegisterUserDTO,
  ): Promise<{ access_token: string }> {
    return this.authService.register(registerUserDto);
  }
}
