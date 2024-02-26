/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import {
  AuthDTOLogin,
  AuthDTORegister,
  AuthDTOResponse,
} from 'src/dtos/auth.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async login(payload: AuthDTOLogin): Promise<AuthDTOResponse> {
    try {
      const userExisted = await this.userRepository.findOneBy({
        username: payload.username,
      });

      if (!userExisted) {
        throw new UnauthorizedException('User not found');
      }

      const isMatchPassword = await bcrypt.compare(
        payload.password,
        userExisted.password,
      );

      if (!isMatchPassword) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const { password, ...user } = userExisted;
      const token = this.jwtService.sign(payload);

      return {
        ...user,
        token,
      };
    } catch (error) {
      throw error;
    }
  }

  async register(payload: AuthDTORegister): Promise<any> {
    try {
      const userExisted = await this.userRepository.findOneBy({
        username: payload.username,
      });

      if (userExisted) {
        throw new BadRequestException('User already exists!');
      }

      const user = await this.userRepository.save(plainToClass(User, payload));

      const { password, ...result } = user;

      return result;
    } catch (error) {
      throw error;
    }
  }
}
