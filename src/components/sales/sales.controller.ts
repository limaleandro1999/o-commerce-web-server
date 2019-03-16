import * as express from 'express'
import * as mongoose from 'mongoose'

import { ControllerInterface } from '../../common/controller.interface';
import { Sale } from './sales.model';
import { Cart } from '../carts/carts.model';

export class SaleController implements ControllerInterface {
    async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        //@ts-ignore
        const userId = req.user.userId

        const sales = await Sale.find({ seller: userId }).populate('product').populate('buyer')
        
        return res.status(200).json(sales)
    }

    getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        throw new Error("Method not implemented.");
    }

    async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        let cart = req.body

        await Promise.all(cart.products.map(async product => {
            let sale
            sale = {}

            sale.total = product.product.price * product.quantity
            sale.quantity = product.quantity
            sale.product = product.product._id
            sale.seller = product.product.seller
            sale.buyer = cart.buyer

            await Sale.create(sale).catch(error => {
                console.log(error)
                return res.json(500).json({ message: 'Internal Server Error' })
            })
        }))  

        cart.products = []
        
        delete cart.__v
        
        await Cart.findOneAndUpdate({_id: cart._id}, cart).catch(error => {
            console.log(error);
            return res.json(500).json({ message: 'Internal Server Error' })
        })

        cart.products = []

        return res.status(200).json(cart)
    }

    put(req: express.Request, res: express.Response, next: express.NextFunction) {
        throw new Error("Method not implemented.");
    }

    delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        throw new Error("Method not implemented.");
    }
}