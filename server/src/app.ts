import express, { Application, Request, Response } from 'express';
// import bodyParser from 'body-parser';
require('dotenv').config()
require('./database/Connection')
import UserRoute from './routes/user';
import GroupRoute from './routes/group';
import EmailRouter from './routes/email';

var cors = require('cors');
// var fs = require('fs');
// var dir = `./${process.env.upload}/files`;

// if (!fs.existsSync(dir)){
//     fs.mkdirSync(dir);
// }

if(process.env.NODE_ENV==='production'){
    console.log = function() {}
}
  


import TweetRoute from './routes/tweet';
import path from 'path';





const app: Application = express()

app.use(cors());
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))/
 
// parse application/json
app.use(express.json())

// console.log();

app.use('/files',express.static(path.join(__dirname,'files')))




const port= process.env.PORT ||3001 ;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Zeel')
})




app.use('/user',UserRoute);
app.use('/group',GroupRoute);
app.use('/tweet',TweetRoute);
app.use('/email',EmailRouter)


app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})

module.exports = app;
