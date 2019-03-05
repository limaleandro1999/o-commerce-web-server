import * as express from 'express'
import * as jwt from 'jsonwebtoken'
import * as expressJwt from 'express-jwt'

import { environment } from '../../config/environment'
import { User } from '../users/users.model'

export class Security {
  static authenticate: express.RequestHandler = (req, res, next) => {
    const { email, password } = req.body
  
    User.findByEmail(email, '+password')
      .then(user => {
        if (user && user.matches(password)) {        
    
          const token = jwt.sign({
            sub: user.email,
            iss: 'o-commerce',
            userId: user._id
          }, environment.security.secret)
          
          //@ts-ignore
          res.json({name: user.name, email: user.email, isBuyer: user.isBuyer, accessToken: token})
          return next(false)
        } else {
          return next(new Error('Invalid Credentials'))
        }
      })
      .catch(next)
  }

  static authorization = expressJwt({ secret: environment.security.secret })
}
