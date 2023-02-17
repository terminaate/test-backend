import { db } from '@/db';
import { DataTypes, Model } from 'sequelize';
import { User } from '@/profile/models/user.model';

export interface UserTokenSchema {
	id: string;
	refreshToken: string;
	userId: string;
}

interface UserTokenCreateAttrs {
	refreshToken: string;
	userId: string;
}

export type UserTokenModel = Model<UserTokenSchema, UserTokenCreateAttrs>;

export const UserToken = db.define<
	UserTokenModel,
	Omit<UserTokenSchema, 'userId'>
>(
	'UserToken',
	{
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true,
		},
		refreshToken: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{ timestamps: true }
);

UserToken.belongsTo(User, {
	foreignKey: 'userId',
});

// import mongoose, { HydratedDocument, InferSchemaType } from 'mongoose';
//
// export const UserTokenSchema = new mongoose.Schema({
// 	refreshToken: {
// 		required: true,
// 		type: String,
// 	},
// 	userId: {
// 		ref: 'User',
// 		required: true,
// 		type: mongoose.Schema.Types.ObjectId,
// 	},
// });
//
// export type IUserToken = InferSchemaType<typeof UserTokenSchema>;
//
// export type UserTokenDocument = HydratedDocument<IUserToken>;
//
// export const UserToken = mongoose.model<IUserToken>(
// 	'UserToken',
// 	UserTokenSchema
// );
