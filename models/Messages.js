import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipent: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    phone: {
      type: String,
    },
    body: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamp: true }
);

const Messages = models.Messages || model('Messages', MessageSchema);
export default Messages;
