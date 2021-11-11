require('dotenv').config()

const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");

const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routers/index.js')
const conversationRoute = require('./routers/conversations.js')
const messageRoute = require('./routers/messages.js')

const MessageService = require('./service/message-service')
const ConversationService = require('./service/conversation-servise')

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,           
    optionSuccessStatus:200
}

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: {
    origin:'http://localhost:3000'
}});

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use(cors(corsOptions));

app.use('/api', router);
app.use('/api/conversation', conversationRoute);
app.use('/api/message', messageRoute);


io.on('connection', (socket) => { 
    
    const {id, rooms} = socket.handshake.query
    console.log("id room" ,id)
    socket.join(id)

    

    console.log("conv romms", rooms , Array.isArray(rooms))
    socket.join(rooms.split(','))

    console.log("soket ",socket.id);
    socket.on("disconnect", () => {
        console.log("soket disc",socket.id);
    });

    socket.on("message", async (message) => {

        
        const newMessage = await MessageService.addMessage(message);
        
        console.log(io.sockets.adapter.rooms)

        io.to(newMessage.conversationId.toString()).emit('message', newMessage)
    
        
    });

    socket.on("createNewConversationWithMessage", async({members, message})=>{
        console.log("createNewConversationWithMessage", members, message)
        const newConversation = await ConversationService.createConversation(members, false)
        const messageInConversation = {...message, conversationId: newConversation._id}
        await MessageService.addMessage(messageInConversation);
        console.log("newConv", newConversation)
        members.forEach(recipient => {
            io.to(recipient).emit('newConversation', {conversation: newConversation, sender: id})
        });
    })

    socket.on("joinToConversation", (conversationId)=>{
        console.log("joinToConversation", conversationId)
        socket.join(conversationId)
    })

    socket.on("newConversation", async (conversation) => {
        const newConversation = await ConversationService.createConversation(conversation.members, conversation.isGroup)
        console.log("newConversation", newConversation)

        recipients = await ConversationService.findAllUsersOfConversation(newConversation._id)
        console.log("recipients", recipients)
        if(newConversation !== null){

            recipients.forEach(recipient => {
                io.to(recipient).emit('newConversation', newConversation)
            });
            
        }
        
    });

});



const start = async ()=>{
    try{
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        httpServer.listen(PORT, ()=>{
            console.log('server is running')
        })
    }
    catch(e){
        console.log(e);
    }
}



start();