const {Schema, model} = require('mongoose');

const MessageSchema = new Schema(
  {
    conversationId: {type: Schema.Types.ObjectId, ref: 'Conversation', required: true},
    sender: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    text: {type: String},
    photos: {type: Array},
    files: {type: Array},
    forwardFrom: {type: Schema.Types.ObjectId, ref: 'Message'},
    reply: {type: Schema.Types.ObjectId, ref: 'User'},
    date:{type: Date, required: true}
  });

module.exports = model("Message", MessageSchema);
