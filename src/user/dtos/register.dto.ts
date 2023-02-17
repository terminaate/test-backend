import {
	IsEmail,
	IsNotEmpty,
	IsString,
	MaxLength,
	MinLength,
} from 'class-validator';

export class RegisterDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(4)
	@MaxLength(20)
	firstName: string;

	@IsEmail()
	email: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(6)
	password: string;
}
