/* eslint-disable @typescript-eslint/no-unsafe-call */
// import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AtLeastOneProperty } from '../validator/AtLeastOneProperty.validator';

export class CreateUserSettingsDto {
  @IsOptional()
  @IsBoolean()
  receiveNotifications?: boolean;
  @IsOptional()
  @IsBoolean()
  receiveEmails?: boolean;
  @IsOptional()
  @IsBoolean()
  receiveSMS?: boolean;
}

export class CreateUserDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  username: string;
  @IsString()
  @IsOptional()
  displayName: string;
  @IsOptional()
  @IsString()
  avatarUrl: string;

  @IsOptional()
  @ValidateNested()
  @AtLeastOneProperty({ message: 'Settings cannot be empty' })
  // @Type(() => CreateUserSettingsDto)
  settings?: CreateUserSettingsDto;
}
