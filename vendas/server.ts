import app from './app'
import { DbConnect } from "./config/database/connection";


const port = process.env.MICROSERVICE_VENDAS_PORT


DbConnect().then(() => {
    app.listen(port, () => {
        console.log(`Server rodando em http://localhost:${port}`)
    })
}
).catch(err => console.log("Erro ao conectar ao banco", err))


