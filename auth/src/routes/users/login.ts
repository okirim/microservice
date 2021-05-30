import { Router, Request, Response } from 'express'
const router = Router()


router.post('/api/users/login', (req: Request, res: Response) => {
    res.send('login');
})

export { router as loginRouter }