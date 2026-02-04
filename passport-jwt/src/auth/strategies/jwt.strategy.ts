import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret',
    });
  }

  validate(payload: any) {
    //THIS PAYLOAD IS THE DATA THAT WE SIGNED
    console.log('Inside jwt strategy validate');
    console.log(payload);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return payload;
  }
}
