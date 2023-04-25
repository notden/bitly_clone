import { Request, Response, NextFunction } from 'express';

const User = require('../models/user');
const jwt = require('jsonwebtoken');

export interface ReqWithAuth extends Request {
    user: typeof User,
    token: String,
}

const auth = async (req: ReqWithAuth, res: Response, next: NextFunction) => {
    try {
        const token = req.body.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user)
            throw new Error('Error! No such user.');

        req.user = user;
        req.token = token;
        next();
    } catch {
        res.status(401).send();
    }
}

module.exports = auth