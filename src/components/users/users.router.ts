import * as express from 'express'
import { RouterInterface } from '../../common/router.interface'
import { UserController } from './users.controller'
import { Security } from '../security/security';

export class UserRouter implements RouterInterface{
    applyRoutes(): express.Router {
        const router = express.Router()
        const userController = new UserController()

        router.get('/', userController.get)
        router.get('/:id', userController.getById)
        router.post('/', userController.post)
        router.post('/authenticate', Security.authenticate)
        router.put('/:id', userController.put)
        router.delete('/:id', userController.delete)

        return router
    }
}