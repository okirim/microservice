import express,{Request,Response,NextFunction} from 'express';
import { json } from 'body-parser'
import { currentUserRouter } from './routes/current-user';
import { loginRouter } from './routes/login';
import { logoutRouter } from './routes/logout';
import { registerRouter } from './routes/register';
import { ErrorHandler } from './utils/exceptions/ErrorHandler';
import { AppError } from './utils/exceptions/AppError';
import { UncaughtException } from './utils/exceptions/catchUnhandledError';

const app = express();

app.use(json());

app.use(currentUserRouter)
app.use(loginRouter)
app.use(logoutRouter)
app.use(registerRouter)


//404 page not found
app.all('*', (req: Request, res: Response, next: NextFunction) => { 

    next(new AppError(
        `PAGE NOT FOUND PLEASE CHECK YOU URL (${req.originalUrl}) `,
        404
    ));
});



app.use(ErrorHandler)


UncaughtException();

const port = 8080


const server=app.listen(port, () => console.log(`Example app listening on port ${port}!`))

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION");
    //console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});