import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthCredentialsDto } from './dtos/authCredentialsDto.dto';
import { User } from './entity/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signUp')
  async signup(@Body() authDto: AuthCredentialsDto): Promise<User | any> {
    const user = await this.authService.createUser(authDto);
    return user;
  }

  @Post('/signin')
  async signin(@Body()authDto:AuthCredentialsDto):Promise<User|any> {
    return this.authService.loginUser(authDto)
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  async test(@Req() req){
    console.log(req)
  }

}
