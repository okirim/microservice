import { Router, Request, Response } from 'express'
const router = Router()

router.post('/api/users/logout', (req:Request, res:Response) => {
    res.send('logout');
})

export { router as logoutRouter }