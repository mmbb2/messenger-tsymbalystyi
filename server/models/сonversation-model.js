const {Schema, model} = require('mongoose');

const ConversationSchema = new Schema({
    members: [{type: Schema.Types.ObjectId, ref: 'User', required: true}],
    admins: {type: Array},
    isGroup: {type: Boolean, required: true}
});

module.exports = model("Conversation", ConversationSchema);
