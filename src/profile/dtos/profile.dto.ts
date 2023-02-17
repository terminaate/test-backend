export class ProfileDto {
	id: string;
	firstName: string;
	lastName?: string;
	email: string;
	gender?: string;
	photo?: string;

	constructor(model) {
		this.id = model.id;
		this.firstName = model.firstName;
		this.lastName = model.lastName;
		this.email = model.email;
		this.gender = model.gender;
		this.photo = model.photo;
	}
}
