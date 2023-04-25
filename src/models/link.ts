import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
    shortURL: {
        type: String,
        required: true,
        unique: true
    },
    URL: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, 
        ref: 'User'
    }
});

const Link = mongoose.model('Link', linkSchema);

module.exports = Link;