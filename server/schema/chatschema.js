import mongoose, { mongo } from "mongoose";

const chatRoomSchema = new mongoose.Schema({
    users: {
        type: [String],
        required: true
    },

},
    {
        timestamps: true,
        collection: 'chatRoom'
    }
)

const chatMessageSchema = new mongoose.Schema({
    chatRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chatRoom',
        required: true
    }, 
    sender: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        collection: 'chatMessages'
    })


export const chatRoom = mongoose.model('chatRoom', chatRoomSchema);

export const chatMessages = mongoose.model('chatMessages',chatMessageSchema)