import * as express from 'express'

import { RouterInterface } from "../../common/router.interface"
import { CartController } from './carts.controller'

export class CartRouter implements RouterInterface {
    applyRoutes(): express.Router {
        const router = express.Router()
        const cartController = new CartController()

        router.get('/', cartController.get)
        router.get('/cart', cartController.getCartByUserId)
        router.get('/cartCount', cartController.getCountCart)
        router.post('/', cartController.post)
        router.post('/addProduct', cartController.addProduct)
        router.put('/:id', cartController.put)
        router.delete('/:id', cartController.delete)

        return router
    }
}