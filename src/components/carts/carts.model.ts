import * as mongoose from 'mongoose'
import { User } from '../users/users.model'
import { Product } from '../products/products.model'

export interface ProductCart extends mongoose.Document {
    product: Product | mongoose.Schema.Types.ObjectId
    quantity: number
}

export interface Cart extends mongoose.Document {
    products: ProductCart[]
    total: number
    buyer: User | mongoose.Schema.Types.ObjectId
}

const productCartSchema = new mongoose.Schema({
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product' 
    },
    quantity: Number
})

export interface CartModel extends mongoose.Model<Cart> {}
export interface ProductCartModel extends mongoose.Model<ProductCart> {}

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            product: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Product' 
            },
            quantity: Number
        }]
    },
    total: {
        type: Number,
        //required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

export const Cart = mongoose.model<Cart, CartModel>('Cart', cartSchema)
export const ProductCart = mongoose.model<ProductCart, ProductCartModel>('ProductCart', productCartSchema)