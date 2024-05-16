import mongoose from 'mongoose'

const dbConnect = () => {
    let MONGO_URL = `${process.env.MICROSERVICE_ESTOQUE_DATABASE_URL}`
    // MONGO_URL += `${process.env.DATABASE_PORT}`
    // MONGO_URL += `/${process.env.DATABASE_DB}`
    mongoose.set('strictQuery', false)

    return mongoose.connect(MONGO_URL,
        {
            authSource: 'admin',
            user: process.env.DATABASE_USER,
            pass: process.env.DATABASE_PASSWORD,
            dbName: process.env.MICROSERVICE_ESTOQUE_DATABASE_NAME,

        },

    ).then(
        () => {
            console.log(`Conectado ao banco ${process.env.MICROSERVICE_ESTOQUE_DATABASE_NAME}`)
            return true
        }
    ).catch(
        (e: any) => {

            console.log('DB connection error:', e)
            throw e
        }
    )
}

export default dbConnect