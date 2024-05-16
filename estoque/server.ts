import app from "./app"
import dbConnect from "./config/database/connection"

const port = process.env.MICROSERVICE_ESTOQUE_PORT

dbConnect()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server rodando em ${process.env.MICROSERVICE_ESTOQUE_PORT}`)
        })
    }
    ).catch(err => console.log("Erro ao conectar ao banco", err))