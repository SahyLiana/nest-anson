import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';

@Injectable()
export class UsersService {
  private fakeUsers = [{ username: 'sa', email: 'sa@gmail.com' }];
  fetchUsers() {
    return this.fakeUsers;
  }

  createUser(userData: CreateUserDto) {
    console.log(userData.age.toPrecision());
    return this.fakeUsers.push(userData);
  }

  fetchUserById(id: number) {
    return { id, username: 'sa', email: 'sa@gmail.com' };
  }
}
