
import express from 'express';
import { config } from 'dotenv'
import cors from 'cors';
import { Request, Response } from 'express'
import amqp from 'amqplib/callback_api';


config({
    path: '.env'
})

const app = express();

app.use(express.json());
app.use(cors())



app.get('/', (req, res) => {
    res.send('Hello World!');
});


const rabbitHost = process.env.RABBITMQ_HOST || 'localhost';
const rabbitPort = process.env.RABBITMQ_PORT || 5672

amqp.connect(`amqp://username:password@${rabbitHost}:${rabbitPort}`, (err: any, connection: any) => {
    if (err) {
        throw err;
    }
    connection.createChannel((err: any, channel: any) => {
        if (err) {
            throw err;
        }
        const queue = 'hello';

        channel.assertQueue(queue, { durable: true });

        app.post('/send', async (req, res) => {
            const msg = req.body.msg;
            await channel.sendToQueue(queue, Buffer.from(msg), { persistent: true });
            res.send('Message sent');
        });
    });
});

app.use((req: Request, res: Response, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})

export default app;
