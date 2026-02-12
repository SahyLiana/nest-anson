/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateUserSettingsDto } from './createUser.dto';
// import { Type } from 'class-transformer';
import { AtLeastOneProperty } from '../validator/AtLeastOneProperty.validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  displayName?: string;
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @ValidateNested()
  //   @Type(() => CreateUserSettingsDto)
  @AtLeastOneProperty({ message: 'Settings cannot be empty' })
  settings?: CreateUserSettingsDto;
}
