import { Router, Request, Response } from 'express'
const router = Router()


router.post('/api/users/login', (req, res) => {
    res.send('login');
})

export { router as loginRouter }