import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorators';
import { AuthGuard } from 'src/guards/auth.guards';
import { RolesGuard } from 'src/guards/roles.guards';

@Controller('users')
export class UsersController {
  // GET /users
  @Get()
  @Roles(['ADMIN', 'OWNER'])
  @UseGuards(AuthGuard, RolesGuard)
  getUser() {
    return { username: 'sa' };
  }

  @Get('test')
  getUserTest() {
    return { test: 'bye' };
  }
}
