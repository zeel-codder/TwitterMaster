
import mongoose from 'mongoose';

import {User,Tweet,Explore,Group} from '../interface/database/Schema';

const { Schema,model } = mongoose;

const UserSchema = new Schema<User>({

    name: String,
    email: String,
    image: String,
    password: String,
    followers:[{type:String}],
    follow:[{type:String}]

},{ versionKey: false });


const TweetSchema = new Schema<Tweet>({

    title: String,
    description: String,
    like:[{type:String}],
    retweet:Number,
    explore:[{type:String}],
    image:String,
    video:String,
    Creator_ID:String,
    Creator_Name:String,
    groups:String,

},{ versionKey: false });






const GroupSchema = new Schema<Group>({
    title: String,
    description: String,
    admin:[{type:String}],
    tweets:[{type:String}],
},{ versionKey: false })



const UserModel=model('User',UserSchema);
const TweetModel=model('Tweet',TweetSchema);
const GroupModel=model('Group',GroupSchema);



// const small = new TweetModel({ name:'zeel',description:'none' });
// small.save(function (err : Error) {
//   if (err) return;
//   console.log('done');
//   // saved!
// });



export {UserModel,TweetModel,GroupModel};