import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDTOLogin {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class AuthDTORegister {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class AuthDTOResponse {
  id: number;
  name: string;
  username: string;
  token: string;
}
