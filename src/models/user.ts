import mongoose from "mongoose";
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        validate(value: String) {
            if (!validator.isEmail(value))
                throw new Error('Error! Invalid email.')
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.virtual('links', {
    ref: 'Link',
    localField: '_id',
    foreignField: 'owner'
});

userSchema.methods.generateAuthToken = async function () {

    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);

    this.tokens.push({ token });
    await this.save();

    return token;
};

userSchema.statics.findByCredentials = async (email: String, password: String) => {
    const user = await User.findOne({ email });

    if (!user)
        throw new Error('Error! There is no user with provided email and/or password.');
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
        throw new Error('Error! There is no user with provided email and/or password.');

    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;