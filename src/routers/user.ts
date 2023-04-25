import { Router, Request, Response } from 'express';

const User = require('../models/user');

const router = Router();

router.post('/users', async (req: Request, res: Response) => {
    try {
        const user = new User(req.body);
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch {
        res.status(400).send();
    }
});

router.post('/users/login', async (req: Request, res: Response) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch { 
        res.status(400).send();
    }
})

module.exports = router;