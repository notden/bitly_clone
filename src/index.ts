import express, { Application } from 'express';
import { config } from 'dotenv';

const userRouter = require('./routers/user');
const linkRouter = require('./routers/link');

require('./db/mongoose')

config();

const app: Application = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(linkRouter);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});