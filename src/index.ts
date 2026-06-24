import express from 'express'
import { config } from 'dotenv'
config()

const app = express()
const PORT = process.env.PORT ?? 3000

async function bootstrap() {
    app.listen(PORT, () => {
        console.log(`API is running on port ${PORT}`)
    })
}

bootstrap()