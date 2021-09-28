
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
    retweet:[{type:String}],
    explore:[{type:String}],
    image:String,
    video:String

},{ versionKey: false });


const ExploreSchema = new Schema<Explore>({
    title: String,
    description: String,
    image: String,
    video: String,
    tweets:[{type:String}],
    creator:String,
},{ versionKey: false })



const GroupSchema = new Schema<Group>({
    title: String,
    description: String,
    image: String,
    video: String,
    admin:[{type:String}],
    users:[{type:String}],
    
},{ versionKey: false })



const UserModel=model('User',UserSchema);
const TweetModel=model('Tweet',TweetSchema);
const GroupModel=model('Group',GroupSchema);
const ExploreModel=model('Explore',ExploreSchema);


// const small = new TweetModel({ name:'zeel',description:'none' });
// small.save(function (err : Error) {
//   if (err) return;
//   console.log('done');
//   // saved!
// });



export {UserModel,TweetModel,GroupModel,ExploreModel};