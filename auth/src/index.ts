import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser'
import { currentUserRouter } from './routes/users/current-user';
import { loginRouter } from './routes/users/login';
import { logoutRouter } from './routes/users/logout';
import { registerRouter } from './routes/users/register';
import { ErrorHandler } from './utils/exceptions/ErrorHandler';
import { AppError } from './utils/exceptions/AppError';
import { UncaughtException } from './utils/exceptions/catchUnhandledError';
import mongoose from 'mongoose';

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

//database connection
//auth-mongo-service => is the name of the mongo service (in auth-mongo.yml //line 22)  
mongoose.connect('mongodb://auth-mongo-service:27017/auth_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(res => console.log('auth database is running'))
    .catch(err => console.log('database error : ', err));
//start a server

const port = 8080

const server = app.listen(port, () => console.log(`auth app listening on port ${port}!`))

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION");
    //console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});