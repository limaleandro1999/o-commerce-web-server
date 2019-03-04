import * as express from 'express'
import * as jwt from 'jsonwebtoken'

import { environment } from '../../config/environment'
import { User } from '../users/users.model'

export const authenticate: express.RequestHandler = (req, res, next) => {
    const { email, password } = req.body
  
    User.findByEmail(email, '+password')
      .then(user => {
        if (user && user.matches(password)) {        
    
          const token = jwt.sign({
            sub: user.email,
            iss: 'o-commerce'
          }, environment.security.secret)
          
          //@ts-ignore
          res.json({name: user.name, email: user.email, isBuyer: user.isBuyer , accessToken: token})
          return next(false)
        } else {
          return next(new Error('Invalid Credentials'))
        }
      })
      .catch(next)
  }
