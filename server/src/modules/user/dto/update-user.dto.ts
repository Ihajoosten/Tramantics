// UpdateUserDTO.ts
import {
  IsString,
  IsEmail,
  IsDate,
  IsEnum,
  IsBoolean,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { ToPhone } from '../../../core/decorators/to-phone.decorator';
import { UserRole } from '../user.entity';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]+$/, {
    message: 'Password is too weak',
  })
  password?: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  fullName?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  address?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  zipCode?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(15)
  @ToPhone
  phone?: string;

  @IsOptional()
  @IsDate()
  birthday?: Date;

  @IsOptional()
  @IsDate()
  lastLoginDate?: Date;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
