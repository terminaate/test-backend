import {
	ValidationArguments,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'user-gender', async: false })
export class UserGender implements ValidatorConstraintInterface {
	validate(value: string, validationArguments?: ValidationArguments): boolean {
		return value === 'male' || value === 'female';
	}

	defaultMessage(validationArguments?: ValidationArguments) {
		return 'Gender must be either male or female only.';
	}
}
