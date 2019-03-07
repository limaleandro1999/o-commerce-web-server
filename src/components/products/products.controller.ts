import * as express from 'express'
import * as mongoose from 'mongoose'

import { ControllerInterface } from "../../common/controller.interface"
import { Product } from './products.model'

export class ProductController implements ControllerInterface {
    async getProductByUserId(req: express.Request, res: express.Response, next: express.NextFunction){
        //@ts-ignore
        if(!req.user){
            next();
        }
        
        //@ts-ignore
        const products = await Product.find({ seller: req.user.userId })

        return res.status(200).json(products)
    }

    async getByProductName(req: express.Request, res: express.Response, next: express.NextFunction) {
        if(!req.query.q){
            return next()
        }

        const products = await Product.find({ name: new RegExp(req.query.q, 'i') })

        return res.status(200).json(products)
    }    

    async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        const products = await Product.find()

        return res.status(200).json(products)
    }    
    
    async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        const productId = req.params.id
        const product = await Product.findOne({_id: productId})

        return product ? res.status(200).json(product) : res.status(400).json({ message: 'Not Found' })
    }
    
    async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        //@ts-ignore
        console.log(req.user);
        
        //@ts-ignore
        req.body.seller = req.user.userId

        const product = await Product.create(req.body).catch(error => {
            return res.status(500).json(error)
        })

        return res.status(200).json(product)
    }
    
    async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        const options = {runValidators: true}

        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            let product = await Product.findOneAndUpdate({_id: req.params.id}, req.body, options).catch(error => {
                return res.status(500).json(error) 
            })

            if(product != null){
                return res.status(200).json(product)
            }
        }
        
        return res.status(404).json({message: 'Document not found'}) 
    }
    
    async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            await Product.findByIdAndDelete(req.params.id)
                .then((cmdResult: any) => {
                    if(cmdResult){
                        return res.status(204).json({message: 'Product deleted'})
                    }
                }).catch(error => {
                    return res.status(500).json(error) 
                })
        }

        return res.status(404).json({message: 'Document not found'})
    }
}