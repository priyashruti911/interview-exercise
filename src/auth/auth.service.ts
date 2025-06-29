import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userData: { username: string; email: string; password: string }) {
    const normalizedEmail = userData.email.toLowerCase();

    const existing = await this.usersService.findByEmail(normalizedEmail);
    if (existing) {
      throw new ConflictException('Email already registered');
    }

    const user = await this.usersService.create({
      username: userData.username,
      email: normalizedEmail,
      password: userData.password,
    });

    const { passwordHash, ...rest } = user;
    return rest;
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email.toLowerCase());
    if (!user) return null;

    const passwordValid = await compare(password, user.passwordHash);
    if (!passwordValid) return null;

    return user;
  }

  async login(credentials: { email: string; password: string }) {
    const user = await this.validateUser(credentials.email, credentials.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
