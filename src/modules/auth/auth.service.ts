import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { AuthCredentialsDto } from './dtos/authCredentialsDto.dto';
import { Validate, validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AccessToken } from './dtos/accessTojen';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) 
    private userRpository: Repository<User>,
    private jwtService:JwtService
  ) {}

  async createUser(authDto: AuthCredentialsDto): Promise<User | any> {
    const { email, password } = authDto;

    // const salt = await bcrypt.genSalt();

    try {
      const hasheed: string = await bcrypt.hash(password, 9); // Correct the order and use hashSync
      console.log(hasheed, 'hasheedhasheed', password);

      const user = { email,password: hasheed };
      console.log(user, password, 'TEST');

      const res = await this.userRpository.save(user);

      return res;
    } catch (err) {
      console.log(err, 'ERROR');
      return err.sqlMessage;
    }
  }

  async loginUser(authDto:AuthCredentialsDto):Promise<{accessToken:string}> {


    const {email, password} = authDto;

    const user = await this.userRpository.findOne({where:{email}})
    const auth = await bcrypt.compare(password,user.password);

    console.log(auth, user,"CHECK")

    console.log(auth);
    if(auth){
      // return true
      const payload = {email};
      const accessToken:string =  this.jwtService.sign(payload);
      return {accessToken}

    }else{
      throw new UnauthorizedException('Please use correct credentials')
    }

  }

}
