import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { AccessToken } from "./dtos/accessTojen";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
    @InjectRepository(User)
     private userRepository : Repository<User>  ){
        super({
            secretOrKey:'secret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
     }

     // some logic, of what we want to do once token is valid
     async  validate(payload:AccessToken): Promise<User>{
        const  {email} = payload
        const user:User = await this.userRepository.findOne({where:{email}});
      
        if(!user){
            throw new UnauthorizedException()
        }
        return user
     }

}