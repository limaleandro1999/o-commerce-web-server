import * as express from 'express'
import * as mongoose from 'mongoose'

import { ControllerInterface } from "../../common/controller.interface"
import { Cart, ProductCart } from './carts.model'
import { Product } from '../products/products.model';

export class CartController implements ControllerInterface {
    get(req: express.Request, res: express.Response, next: express.NextFunction) {
        throw new Error("Method not implemented.");
    }

    async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        throw new Error("Method not implemented.");
    }

    async getCartByUserId(req: express.Request, res: express.Response, next: express.NextFunction) {
        //@ts-ignore
        let userId = req.user.userId
        let cart = await Cart.findOne({ buyer: userId })
        
        await Promise.all(cart.products.map(async product => {
            product.product = await Product.findById(product.product)
        }))

        return res.status(200).json(cart)
    }

    post(req: express.Request, res: express.Response, next: express.NextFunction) {
        throw new Error("Method not implemented.");
    }

    async addProduct(req: express.Request, res: express.Response, next: express.NextFunction) {
        //@ts-ignore
        let userId = req.user.userId

        let cart = await Cart.findOne({ buyer: userId })

        if(cart){
            let productCart = new ProductCart({ product: req.body.productId, quantity: 1 })           
            
            let existent = false

            cart.products.map(product => {               
                if(product.product == req.body.productId){
                    product.quantity++
                    existent = true
                }
            })

            if(!existent){
                cart.products.push(productCart)
            }

            cart.save().then(cart => { return res.status(200).json(cart) })
        }else{
            let productCart = new ProductCart({ product: req.body.productId, quantity: 1 })

            cart = await Cart.create({ buyer: userId, products: productCart })
            return res.status(200).json(cart)
        }
    }

    async getCountCart(req: express.Request, res: express.Response, next: express.NextFunction) { 
        //@ts-ignore
        let userId = req.user.userId

        let cart = await Cart.findOne({ buyer: userId })
        let countProducts = 0

        cart.products.map(product => {
            countProducts += product.quantity
        })

        return res.status(200).json({ countProducts: countProducts, cart: cart })
    }

    put(req: express.Request, res: express.Response, next: express.NextFunction) {
        throw new Error("Method not implemented.");
    }

    delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        throw new Error("Method not implemented.");
    }
}