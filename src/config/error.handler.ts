import * as express from 'express'

export const handleError = (err, req: express.Request, res: express.Response, next: express.NextFunction) => {
    switch(err.name) {
		case 'UnauthorizedError':
			switch(err.message){
				case 'invalid token':
				return res.status(err.status).json({message: err.message})
					
				case 'jwt expired':
				return res.status(err.status).json({message: err.message})

				case 'No authorization token was found':
				return res.status(err.status).json({message: err.message})
			}
			
			break

		case 'MongoError':
			if (err.code === 11000) {
				err.statusCode = 400
			}

			return res.status(err.statusCode).json({message: err.message})
      
		case 'ValidationError':
			err.statusCode = 400
			const messages: any[] = []
			
			for (let name in err.errors) {
				messages.push({
					message: err.errors[name].message
				})
			}

			return res.status(err.statusCode).json({ 
				message: 'Validation error while processing your request', 
				errors: messages 
			})

		case 'ValidatorError':
			err.statusCode = 400
			
			return res.status(err.statusCode).json({message: err.message})
    }

    next()
}