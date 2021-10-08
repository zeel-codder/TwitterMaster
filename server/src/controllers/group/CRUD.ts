import { Response, Request } from 'express';
import { GroupModel } from '../../database/Schema';
import { Group } from '../../interface/database/Schema';
import { ErrorLoader,ResultLoader } from "../Response";




const GetGroups = async (req: Request, res: Response) => {

    try {

        let GroupList = await GroupModel.find({});
        GroupList= Array.from(GroupList).reverse();



        res.status(200).send(ResultLoader("All Group",GroupList));

    } catch (e: any) {



        res.status(404).send(ErrorLoader("GroupList not found",e.message));

    }



}




const GetGroup = async (req: Request, res: Response) => {

    try {

        const {_id}=req.params;
        // console.log(name);

        const Group = await GroupModel.findOne({_id});

        if(Group===null){
            return res.status(404).send(ErrorLoader("Group Not Found","Not Found"))
        }

        res.status(200).send(ResultLoader("Group",Group));

    } catch (e: any) {



        res.status(404).send(ErrorLoader("Group not found",e.message));

    }



}


const AddGroup = async (req: Request, res: Response) => {

    try {

        let newGroup: Group = req.body;

        if (!newGroup) {
            return res.status(500).send(ErrorLoader("Invalid Input","Input"))
        }


        newGroup = {
            admin: [],
            users:[],   
            ...newGroup,
        }



        const newDoc = new GroupModel(newGroup);

        const Group = await newDoc.save();


        res.status(200).send(ResultLoader("Group Added",Group));
    } catch (e: any) {

        res.status(404).send(ErrorLoader(e.message,"Error"));

    }

}



const DeleteGroup = async (req: Request, res: Response) => {

    try {
        let {_id} = req.body;
        const GroupDelete = await GroupModel.deleteOne({_id});
        res.status(200).send(ResultLoader("Groups Deleted",GroupDelete));

    } catch (e: any) {
        
        res.status(404).send(ErrorLoader("GroupList not found",e.message));

    }
}



const UpdateGroup = async (req: Request, res: Response) => {

    try {
        let {before,after} = req.body;

        const {_id,user_id,type}=before;

        const newGroup:Group=after;

        let Group=await GroupModel.findOne({_id});

        switch (type) {

            case "admin":
                Group.admin.push(user_id);
                await Group.save();
            break;
            case "users":
                Group.users.push(user_id);
                await Group.save();
            break;
            case "remove users":
                Group.users.pull(user_id);
                await Group.save();
            break;
            case "any":
                await GroupModel.findOneAndUpdate({ _id }, newGroup);
                Group=await GroupModel.findOne({_id});
            break;
            default:
                return res.status(500).send(ErrorLoader("Invalid Input","Input"))
                
        }

      

        if(Group==null){
            res.status(404).send(ErrorLoader("Group Not Found",Group));
        }

        res.status(200).send(ResultLoader("Groups Updated",Group));

    } catch (e: any) {
        
        res.status(404).send(ErrorLoader("GroupList not found",e.message));

    }
}




export { GetGroups, AddGroup ,DeleteGroup,UpdateGroup ,GetGroup};


