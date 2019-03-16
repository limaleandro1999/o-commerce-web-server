import * as express from 'express'

import { RouterInterface } from "../../common/router.interface"
import { SaleController } from './sales.controller'

export class SaleRouter implements RouterInterface {
    applyRoutes(): express.Router {
        const router = express.Router()
        const saleController = new SaleController()

        router.get('/', saleController.get)
        router.get('/:id', saleController.getById)
        router.post('/', saleController.post)
        router.put('/:id', saleController.put)
        router.delete('/:id', saleController.delete)

        return router
    }
}