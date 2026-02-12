import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserSettings } from 'src/schemas/userSettings.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private userSettingsModel: Model<UserSettings>,
  ) {}

  async createUser({ settings, ...createUserDto }: CreateUserDto) {
    if (settings) {
      const newSettings = new this.userSettingsModel(settings);
      const savedNewSettings = await newSettings.save();
      const newUser = new this.userModel({
        ...createUserDto,
        settings: savedNewSettings._id,
      });
      return newUser.save();
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  getUsers() {
    return this.userModel.find({ populate: 'settings' });
  }

  getUserById(id: string) {
    return this.userModel.findById(id, { populate: 'settings' });
  }

  //   updateUser(id: string, updateUserDto: UpdateUserDto) {
  //     return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  //   }

  async updateUser(id: string, { settings, ...updateUserDto }: UpdateUserDto) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (settings) {
      if (user.settings) {
        // Update existing settings
        await this.userSettingsModel.findByIdAndUpdate(
          user.settings,
          settings,
          {
            new: true,
          },
        );
        return this.userModel.findByIdAndUpdate(id, updateUserDto, {
          new: true,
        });
      } else {
        // Create new settings and link
        const newSettings = new this.userSettingsModel(settings);
        const savedSettings = await newSettings.save();
        return this.userModel.findByIdAndUpdate(
          id,
          {
            settings: savedSettings._id,
            ...updateUserDto,
          },
          { new: true },
        );
      }
    }
  }

  /////////////////////BETTER WAY:::::::::::::::::

  //   async updateUser(id: string, { settings, ...updateUserDto }: UpdateUserDto) {
  //   // 1️⃣ Find the user
  //   const user = await this.userModel.findById(id);
  //   if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

  //   // 2️⃣ Update user fields
  //   Object.assign(user, updateUserDto);

  //   // 3️⃣ Handle settings if provided
  //   if (settings) {
  //     if (user.settings) {
  //       // Update existing settings
  //       await this.userSettingsModel.findByIdAndUpdate(user.settings, settings, { new: true });
  //     } else {
  //       // Create new settings and link
  //       const newSettings = new this.userSettingsModel(settings);
  //       const savedSettings = await newSettings.save();
  //       user.settings = savedSettings._id;
  //     }
  //   }

  //   // 4️⃣ Save updated user
  //   await user.save();

  //   // 5️⃣ Return user with populated settings
  //   return this.userModel.findById(id).populate('settings');
  // }

  //   deleteUser(id: string) {
  //     return this.userModel.findByIdAndDelete(id);
  //   }
  async deleteUser(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Delete related settings
    if (user.settings) {
      await this.userSettingsModel.findByIdAndDelete(user.settings);
    }

    // Delete the user
    await this.userModel.deleteOne({ _id: id });

    return { message: 'User and settings deleted successfully' };
  }
}
