import mongoose from "mongoose";


const requestsSchema = new mongoose.Schema({

    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending','accepted', 'rejected'],
        default: 'pending',
        required: true
    }


},
{
    timestamps: true,
    collection: 'requests'
})

export const requests = mongoose.model('requests', requestsSchema);