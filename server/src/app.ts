import express, { Application, Request, Response } from 'express';
// import bodyParser from 'body-parser';
require('dotenv').config()
require('./database/Connection')
import UserRoute from './routes/user';
import ExploreRoute from './routes/explore';
import GroupRoute from './routes/group';
var cors = require('cors');

import TweetRoute from './routes/tweet';



const app: Application = express()

app.use(cors());
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))/
 
// parse application/json
app.use(express.json())




const port: number = 3001

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Zeel')
})


app.use('/user',UserRoute);
app.use('/group',GroupRoute);
app.use('/explore',ExploreRoute);
app.use('/tweet',TweetRoute);

app.listen(port, function () {
    console.log(`App is listening on port ${port} !`)
})





// /api/tweet/create
// /api/tweet/detect
// /api/tweet/update


// /api/group/create
// /api/group/detect
// /api/group/update


// /api/explore/create
// /api/explore/detect
// /api/explore/update

