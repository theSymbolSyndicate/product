import { UserRole } from '@/constants';
import mongoose from 'mongoose';

const { Schema } = mongoose;

// Schema
const userSchema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true
		},
		name: {
			type: String,
			required: true
		},
		role: {
			type: String,
			enum: [UserRole.USER, UserRole.DESIGNER, UserRole.ADMIN],
			required: true
		},
		avatar: {
			type: String
		}
	},
	{
		timestamps: true
	}
);

// Model
export default mongoose.models?.User || mongoose.model('User', userSchema);
