import { TaskStatus } from '@/constants';
import mongoose from 'mongoose';

const { Schema } = mongoose;

// Schema
const taskSchema = new Schema(
	{
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		status: {
			type: String,
			enum: [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE, TaskStatus.CLOSED],
			default: TaskStatus.OPEN
		},
		formData: {
			type: Schema.Types.Mixed,
			default: {}
		},
		assignees: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User'
			}
		],
		referenceImages: [{ type: String }]
	},
	{
		timestamps: true,
		toObject: {
			transform: function (doc, ret) {
				ret.id = ret._id.toString();
				delete ret._id;
				delete ret.__v;
				return ret;
			}
		},
		toJSON: {
			transform: function (doc, ret) {
				ret.id = ret._id.toString();
				delete ret._id;
				delete ret.__v;
				return ret;
			}
		}
	}
);

// Model
export default mongoose.models?.Task || mongoose.model('Task', taskSchema);
