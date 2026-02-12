import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  createUser(@Body() createUser: CreateUserDto) {
    console.log(createUser);
    return this.userService.createUser(createUser);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const findUser = await this.userService.getUserById(id);
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('ID not valid', HttpStatus.BAD_REQUEST);
    }

    if (!findUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      return findUser;
    }
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('ID not valid', HttpStatus.BAD_REQUEST);
    }

    const updateUser = await this.userService.updateUser(id, updateUserDto);
    console.log(updateUser);
    if (!updateUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return updateUser;
  }

  @Delete('id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
      throw new HttpException('ID not valid', HttpStatus.BAD_REQUEST);
    }
    const deletedUser = await this.userService.deleteUser(id);
    if (!deletedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return deletedUser;
  }
}
