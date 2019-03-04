import * as express from 'express'
import { UserRouter } from '../components/users/users.router'

export class Router {
    app: express.Application

    constructor(app: express.Application){
        this.app = app
    }

    configRouter(){
        this.app.use('/users', new UserRouter().applyRoutes())
    }
}