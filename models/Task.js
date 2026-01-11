import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({

    author: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, required: true },
    picture: { type: String, required: false},
    
}, {timestamps: true})

export default mongoose.model('Task', taskSchema);