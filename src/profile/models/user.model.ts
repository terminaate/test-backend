import { db } from '@/db';
import { DataTypes, Model } from 'sequelize';

export interface UserSchema {
	id: string;
	firstName: string;
	lastName?: string;
	email: string;
	password: string;
	gender?: string;
	photo?: string;
}

export interface UserCreateAttrs {
	firstName: string;
	email: string;
	password: string;
}

export type UserModel = Model<UserSchema, UserCreateAttrs>;

export const User = db.define<UserModel, UserSchema>(
	'User',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		lastName: {
			type: DataTypes.STRING,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		gender: {
			type: DataTypes.STRING,
		},
		photo: {
			type: DataTypes.STRING,
		},
	},
	{ timestamps: true }
);
