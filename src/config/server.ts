import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'
import * as mongoose from 'mongoose'

import { environment } from './environment'
import { Router } from './router'
import { handleError } from './error.handler'
import { Security } from '../components/security/security'

export default class App {
    private app: express.Application = express()

    private setAppConfig = () => {
        this.initializeDb().then(() => {
            this.app.use(bodyParser.urlencoded({ extended: false}))
            this.app.use(bodyParser.json())
            this.app.use(cors())
            this.app.use((req, res, next) => {
                console.log(req.path)
                next()
            })
            this.app.use([Security.authorization.unless({ 
                    path: [
                        { url: '/users', methods: ['POST'] },
                        /^\/products\/.*/,
                        '/products/list',
                        '/users/authenticate'
                    ]
                })
            ])   
            this.app.use(handleError)
            
            const router = new Router(this.app)
            router.configRouter()
        }).catch(error => {
            console.log(`Could not connect to database. Error: ${error}`)
        })
    }

    private initializeDb = () => {
        (<any>mongoose).Promise = global.Promise
        
        mongoose.set('useCreateIndex', true)
        return mongoose.connect(environment.db.url, {useNewUrlParser: true})
    }

    getApp = () => {
        this.setAppConfig()
        return this.app
    }
}