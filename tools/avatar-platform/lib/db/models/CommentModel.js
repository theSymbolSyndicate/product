import mongoose from 'mongoose';

const { Schema } = mongoose;

// Schema
const commentSchema = new Schema(
	{
		createdBy: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		taskId: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		}
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
export default mongoose.models?.Comment || mongoose.model('Comment', commentSchema);
