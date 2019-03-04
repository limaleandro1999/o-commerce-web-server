import * as express from 'express'

export const handleError = (err, req: express.Request, res: express.Response, next: express.NextFunction) => {
    err.toJSON = () => {
      return {
        message: err.message
      }
    }
  
    switch(err.name) {
      case 'MongoError':
        if (err.code === 11000) {
          err.statusCode = 400
        }
        
        break
      
    case 'ValidationError':
        err.statusCode = 400
        const messages: any[] = []
        
        for (let name in err.errors) {
          messages.push({
            message: err.errors[name].message
          })
        }

        err.toJSON = () => ({
          message: 'Validation error while processing your request',
          errors: messages
        })

        break

    case 'ValidatorError':
        err.statusCode = 400
        
        break
    }

    next()
  }