
import mongoose from 'mongoose';

import {User,Tweet,Explore,Group} from '../interface/database/Schema';

const { Schema,model } = mongoose;

const UserSchema = new Schema<User>({

    name: String,
    email: String,
    image: String,
    password: String,
    followers:[{type:String}],
    follow:[{type:String}],
    

},{ versionKey: false,timestamps: true });


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
    comments:[{title:String,Creator_Name:String}],
    url:String,
    public_id_media:String

},{ versionKey: false ,timestamps: true});






const GroupSchema = new Schema<Group>({
    title: String,
    description: String,
    users:[{type:String}],
    tweets:[{type:String}],
},{ versionKey: false,timestamps: true })



const UserModel=model('User',UserSchema);
const TweetModel=model('Tweet',TweetSchema);
const GroupModel=model('Group',GroupSchema);









export {UserModel,TweetModel,GroupModel};