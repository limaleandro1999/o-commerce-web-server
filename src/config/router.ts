import * as express from 'express'
import { UserRouter } from '../components/users/users.router'
import { ProductRouter } from '../components/products/products.router'

export class Router {
    app: express.Application

    constructor(app: express.Application){
        this.app = app
    }

    configRouter(){
        this.app.use('/users', new UserRouter().applyRoutes())
        this.app.use('/products', new ProductRouter().applyRoutes())
    }
}