const {Schema, model} = require('mongoose');

const ConversationSchema = new Schema({
    members: {type: Array, required: true},
    admins: {type: Array}
});

module.exports = model("Conversation", ConversationSchema);
