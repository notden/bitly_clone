import { Router, Request, Response } from 'express';

const randomstring = require('randomstring');
const Link = require('../models/link');
const auth = require('../middleware/auth');

const router = Router();

router.post('/links', auth, async (req: any, res: Response) => {
    const link = new Link({
        ...req.body,
        owner: req.user
    });

    while (true) {
        try {
            link.shortURL = process.env.HOST + randomstring.generate(7);
            await link.save();
            await link.populate('owner');
            return res.status(201).send({ "shortURL": link.shortURL });
        } catch {};
    };
});

router.get('/links', auth, async (req: any, res: Response) => {
    try {
        await req.user.populate({
            path: 'links'
        });
        res.send(req.user.links);
    } catch {
        res.status(500).send();
    }
});

router.get('/:url', async (req: Request, res: Response) => {
    try {
        const link = await Link.findOne({ shortURL: process.env.HOST + req.params.url });
        res.redirect(link.URL);
    } catch {
        res.status(400).send();
    }
})

module.exports = router;