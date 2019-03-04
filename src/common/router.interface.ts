import * as express from 'express' 

export interface RouterInterface {
    applyRoutes(): express.Router
}