import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import product_store_routes from './handlers/product'
import user_store_routes from './handlers/users'
import order_store_routes from './handlers/orders'
import dashboardRoutes from './handlers/dashboard'
import cors from 'cors'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsOptions={
    origin:'http://ordersStore.com',
    optionsSuccessStatus:200
}


app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

product_store_routes(app);

user_store_routes(app);

order_store_routes(app);

dashboardRoutes(app);
app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app;
