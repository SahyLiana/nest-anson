import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
//import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
//import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './guards/local.guard';
import type { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  //NOT RECOMMENDED
  //@UseGuards(AuthGuard('local')) //Using the local.strategy we created
  @UseGuards(LocalGuard)
  //login(@Body() authPayload: AuthPayloadDto) {
  // return this.authService.validateUser(authPayload);
  login(@Req() req: Request) {
    //console.log(req.user);
    return req.user;
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    console.log('inside auth controller status');
    console.log(req.user);
    return req.user;
  }
}
