import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserDTO } from './dto/login-user.dto';
import { RegisterUserDTO } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDTO): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(loginUserDto.email);

    const passwordMatch = this.comparePassword(
      loginUserDto.password,
      user.password,
    );

    if (!passwordMatch) {
      return null;
    }

    const payload = {
      uuid: user.uuid,
      username: user.username,
      role: user.role,
    };
    const access_token = await this.generateToken(payload);

    return { access_token };
  }

  async register(
    registerUserDTO: RegisterUserDTO,
  ): Promise<{ access_token: string }> {
    try {
      const pass = await this.hashPassword(registerUserDTO.password);

      // create the user
      const newUser = await this.userService.create({
        ...registerUserDTO,
        password: pass,
      });

      // Automatically log in the new user after registration
      return this.login(newUser);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new ConflictException('Username is already taken');
      }
      throw error;
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.userService.findOne(payload.username);
  }

  private async generateToken(payload: any) {
    return await this.jwtService.signAsync(payload);
  }

  private async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  private async comparePassword(enteredPassword: string, dbPassword: string) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }
}
