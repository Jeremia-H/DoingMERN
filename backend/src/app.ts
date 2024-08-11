import "dotenv/config";                                                                                      //for .env folder
import express, { NextFunction, Request, Response } from "express";                                          //import express
import listdataRoutes from "./routes/lists"
import createHttpError, { isHttpError } from "http-errors";                                                  //createHttpError is a default immport, isHttpError not 
import morgan from "morgan"
import userRoutes from "./routes/users";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import cors from "cors";
import { requiresAuth } from "./middleware/auth";

const app = express();                                                                                       //dont know what this does yet / calls the express function i guess

app.use(morgan("dev"));                                                                                     //installed morgan for cooler logs

app.use(express.json());

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
      credentials: true,
    })
  );

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60*60*1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNNECTION_STRING
    }),
}));


app.use("/api/users", userRoutes);
app.use("/api/listdata",requiresAuth,  listdataRoutes);                                                               //linking the sensordataroute //we call requiresAuth Middleware so we check if a user session is already established or not

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));                                                        //Error handling via the http-errors package
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {                               //moves error handling from a try catch stateent into a the error handler of express
    console.error(error);                                                                                    //prints the error into the console
    let errorMessage = "An Unknown error occurred";                                                          //create variable errorMessage with a default String, this can be cahnged by the error itself
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;                                          
        errorMessage = error.message;
    }                                                                                                        //We have to verify if the error is actually and error, because the catch function catches everythign unknown
    res.status(statusCode).json({ error: errorMessage });                                                    //give out a error response and includes the error Message as Json
});

export default app;                                                                                          //expor the app const so we can import it in the server.ts