import * as express from 'express'
import * as mongoose from 'mongoose'

import { User } from './users.model'
import { ControllerInterface } from "../../common/controller.interface"

export class UserController implements ControllerInterface{
    async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        const users = await User.find()

        return res.status(200).json(users)
    }    
    
    async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        const userId = req.params.id
        const user = await User.findOne({_id: userId})

        return user ? res.status(200).json(user) : res.status(400).json({ message: 'Not Found' })
    }
    
    async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.isBuyer = req.body.isBuyer === "true" ? true : false
        
        const user = await User.create(req.body).catch(error => {
            return res.status(500).json(error)
        })

        return res.status(200).json(user)
    }
    
    async put(req: express.Request, res: express.Response, next: express.NextFunction) {
        const options = {runValidators: true}

        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            if(req.body.isBuyer){
                req.body.isBuyer = req.body.isBuyer === "true" ? true : false
            }

            let user = await User.findOneAndUpdate({_id: req.params.id}, req.body, options).catch(error => {
                return res.status(500).json(error) 
            })

            if(user != null){
                return res.status(200).json(user)
            }
        }
        
        return res.status(404).json({message: 'Document not found'}) 
    }
    
    async delete(req: express.Request, res: express.Response, next: express.NextFunction) {
        if(mongoose.Types.ObjectId.isValid(req.params.id)){
            await User.findByIdAndDelete(req.params.id)
                .then((cmdResult: any) => {
                    if(cmdResult){
                        return res.status(204).json({message: 'User deleted'})
                    }
                }).catch(error => {
                    return res.status(500).json(error) 
                })
        }

        return res.status(404).json({message: 'Document not found'})
    }
}