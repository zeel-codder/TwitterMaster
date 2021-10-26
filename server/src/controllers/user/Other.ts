
import { Response, Request } from 'express';
import { ErrorLoader, ResultLoader } from "../Helper";
import { UserModel } from '../../database/Schema';
import { GetUser } from './CRUD';
import { GetNewUser } from './Helper';



const UserFollow = async (req: Request, res: Response) => {

    try {
        const Name: string = req.body.name;
        const isAdd: boolean = req.body.isAdd;
        const MyName: string = req.user_name as unknown as string;

        console.log('call')

        const Mydata = await UserModel.findOne({ name: MyName });
        const data = await UserModel.findOne({ name: Name });

        if (!Mydata || !data || isAdd == undefined) {
            return res.status(404).send(ErrorLoader("User not found", "nothing"));
        }

        let flag: boolean = Mydata.follow.includes(Name);

        if (isAdd && !flag) {
            Mydata.follow.push(Name);
        } else if (flag) {
            Mydata.follow.splice(Mydata.follow.indexOf(Name), 1);
        }

        const UserData=await Mydata.save();


        flag = data.followers.includes(MyName);

        if (isAdd && !flag) {
            data.followers.push(MyName);
        } else if (flag) {
            data.followers.splice(data.follow.indexOf(MyName), 1);
        }

        const UserData2 = await data.save();


        res.status(200).send(ResultLoader("Done",GetNewUser(UserData2,req.user_name)));
    } catch (e: any) {
        console.log(e);
        res.status(404).send(ErrorLoader("TweetList not found", e.message));
    }
}


export { UserFollow };