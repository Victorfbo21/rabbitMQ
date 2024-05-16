
import express from 'express';
import { config } from 'dotenv'
import { Request, Response } from 'express'
import cors from 'cors';
import amqp, { Channel, Connection } from 'amqplib';

config({
    path: '.env'
})

const app = express();
app.use(express.json());
app.use(cors());


const rabbitmqHost = process.env.RABBITMQ_HOST || 'localhost';
const rabbitmqPort = process.env.RABBITMQ_PORT || 5672;


async function createChannel(connection: Connection) {
    return await connection.createChannel()
}

async function createConnection() {
    return await amqp.connect(`amqp://username:password@${rabbitmqHost}:${rabbitmqPort}`)
}

function consumeMsg(queue: string, channel: Channel) {
    channel.assertQueue(queue, { durable: true });
    return channel.consume(queue, (msg: any) => {
        console.log(msg)
        if (msg !== null) {
            console.log('Received:', msg.content.toString());
            channel.ack(msg);
        }
    });
}


async function init() {
    const connection: Connection = await createConnection()
    const channel = await createChannel(connection)

    await channel.assertQueue('hello', { durable: true });

    await consumeMsg('hello', channel);
}


init()

app.use((req: Request, res: Response, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', '*')
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})


export default app;