import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'
import { environment } from '../../config/environment'

export interface User extends mongoose.Document{
    name: string,
    email: string,
    password: string,
    cpf: string,
    matches(password: string): boolean
}

export interface UserModel extends mongoose.Model<User>{
    findByEmail(email: string, projection?: string): Promise<User>
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        //Regex expression to valid email
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        select: false
    },
    cpf: {
        type: String,
        unique: true,
        match: RegExp('[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}')
    },
    phone: {
        type: String,
        required: true
    },
    cep: {
        type: String,
        match: RegExp('^\\d{5}[-]\\d{3}$')
    },
    address: {
        type: String
    },
    cnpj: {
        type: String,
        unique: true,
        match: RegExp('[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}')
    },
    isBuyer: {
        type: Boolean,
        required: true
    }
})

userSchema.statics.findByEmail = function(email: string, projection: string) {
    return this.findOne({email}, projection)
}

userSchema.methods.matches = async function(password: string) {
    const hash = await bcrypt.hash(password, environment.security.salt_rounds)

    return bcrypt.compareSync(hash, this.password)
}

const hashParser = (obj, next) => {
    bcrypt
    .hash(obj.password, environment.security.salt_rounds)
    .then(hash => {
        obj.password = hash
        next()
    }).catch(next)
}

const saveMiddleware = function(next){
    const user: User = this

    if(!user.isDirectModified('password')){
        next()
    }else{
        hashParser(this, next)
    }
}

const updateMiddleware = function(next){
    if(!this.getUpdate().password){
        next()
    }else{
        hashParser(this.getUpdate(), next)
    }
}

const hidePasswordMiddleware = function(doc){
    doc.password = undefined
}

userSchema.pre('save', saveMiddleware)
userSchema.post('save', hidePasswordMiddleware)
userSchema.pre('findOneAndUpdate', updateMiddleware)

export const User = mongoose.model<User, UserModel>('User', userSchema)