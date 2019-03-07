import * as express from 'express'

import { RouterInterface } from "../../common/router.interface"
import { ProductController } from './products.controller'

export class ProductRouter implements RouterInterface {
    applyRoutes(): express.Router {
        const router = express.Router()
        const productController = new ProductController()

        router.get('/', [productController.getProductByUserId, productController.get])
        router.get('/list', productController.getByProductName)
        router.get('/:id', productController.getById)
        router.post('/', productController.post)
        router.put('/:id', productController.put)
        router.delete('/:id', productController.delete)

        return router
    }
}