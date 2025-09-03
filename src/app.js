import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mockRouter from './routes/mocks.router.js';
import config from './config/config.js';

const app = express();
const PORT = config.PORT;

//const connection = mongoose.connect(`URL DE MONGO`)
const connection = mongoose.connect(config.MONGO_URL,{dbName:config.DB_NAME})
    .then(() => console.log("Connection successful MongoDB"))
    .catch((err) => {
        console.error({ error: err })
        process.exit(1)
    })
    
const options = {
    definition:{
        openapi:"3.0.0",
        info: {
            title:"Adoptme",
            version: "1.0.0",
            description:"Documentación proyecto Adoptme"
        }
    },
    apis:["./src/docs/*.yaml"]
}

const spec=swaggerJSDoc(options)

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mockRouter);
app.use("/docs",swaggerUI.serve,swaggerUI.setup(spec))

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))