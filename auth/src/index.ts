import express, { Response, Request } from 'express'
import { json } from 'body-parser'

const app = express();

app.use(json())

app.get('/api/users/me', (req: Request, res: Response) => {
    res.send('hello okirim')
})
const port = 3000;

app.listen(port, () => {
    console.log(`listening on port ${port} !!`);
})