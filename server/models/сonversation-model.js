const {Schema, model} = require('mongoose');

const ConversationSchema = new Schema({
    members: {type: Array, required: true},
    admins: {type: Array},
    isGroup: {type: Boolean, required: true}
});

module.exports = model("Conversation", ConversationSchema);
