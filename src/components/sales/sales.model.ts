import * as mongoose from 'mongoose'
import { User } from '../users/users.model'
import { Product } from '../products/products.model'

export interface Sale extends mongoose.Document {
    total: number
    quantity: number
    date: Date
    product: Product | mongoose.Schema.Types.ObjectId
    buyer:  User | mongoose.Schema.Types.ObjectId
    seller: User | mongoose.Schema.Types.ObjectId
}

export interface SaleModel extends mongoose.Model<Sale> {}

const saleSchema = new mongoose.Schema({
    total: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true 
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export const Sale = mongoose.model<Sale, SaleModel>('Sale', saleSchema)