import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthDTOLogin, AuthDTORegister } from 'src/dtos/auth.dto';
import { AuthService } from 'src/services/auth.service';
import { Public } from 'src/services/authgruad.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() payload: AuthDTOLogin, @Res() res: Response) {
    return res
      .status(HttpStatus.OK)
      .json(await this.authService.login(payload));
  }

  @Public()
  @Post('/register')
  async register(@Res() res: Response, @Body() payload: AuthDTORegister) {
    res
      .status(HttpStatus.CREATED)
      .json(await this.authService.register(payload));
  }
}
