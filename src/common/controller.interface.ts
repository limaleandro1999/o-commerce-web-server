import * as express from 'express'

export interface ControllerInterface {
    get(req: express.Request, res: express.Response, next: express.NextFunction)
    getById(req: express.Request, res: express.Response, next: express.NextFunction)
    post(req: express.Request, res: express.Response, next: express.NextFunction)
    put(req: express.Request, res: express.Response, next: express.NextFunction)
    delete(req: express.Request, res: express.Response, next: express.NextFunction)
}