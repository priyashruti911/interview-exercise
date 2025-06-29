import {
  Controller,
  Post,
  Body,
  UsePipes,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Type, Static } from '@sinclair/typebox';

import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './jwt.guard.js';
import { TypeboxValidationPipe } from '../common/pipes/typebox-validation.pipe.js';

const RegisterDto = Type.Object({
  username: Type.String(),
  email: Type.String({ format: 'email' }),
  password: Type.String(),
});
type RegisterDtoType = Static<typeof RegisterDto>;

const LoginDto = Type.Object({
  email: Type.String({ format: 'email' }),
  password: Type.String(),
});
type LoginDtoType = Static<typeof LoginDto>;

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new TypeboxValidationPipe())
  async register(@Body() body: RegisterDtoType) {
    return this.authService.register(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UsePipes(new TypeboxValidationPipe())
  async login(@Body() body: LoginDtoType) {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Req() req: any) {
    return req.user;
  }
}
