import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	MinLength, Validate
} from 'class-validator';
import { UserGender } from '@/validators/UserGender';

export class PatchProfileDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MinLength(4)
	@MaxLength(20)
	firstName?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MinLength(4)
	@MaxLength(20)
	lastName?: string;

	@IsOptional()
	@IsEmail()
	email?: string;

	@IsOptional()
	@IsString()
	@Validate(UserGender)
	gender?: string;

	@IsOptional()
	photo?: Express.Multer.File;
}
