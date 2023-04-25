import express, { Application, Request, Response } from 'express';
import { config } from 'dotenv';

config();

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Express server with TS');
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});