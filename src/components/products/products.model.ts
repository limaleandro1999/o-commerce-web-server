import * as mongoose from 'mongoose'
import { User } from '../users/users.model'

export interface Product extends mongoose.Document {
    name: string
    description: string
    price: number
    seller: User | mongoose.Schema.Types.ObjectId
}

export interface ProductModel extends mongoose.Model<Product> {}

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export const Product = mongoose.model<Product, ProductModel>('Product', productSchema)