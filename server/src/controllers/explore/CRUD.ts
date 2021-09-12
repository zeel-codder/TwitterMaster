import { Response, Request } from 'express';
import { ExploreModel } from '../../database/Schema';
import { Explore } from '../../interface/database/Schema';
import { ErrorLoader,ResultLoader } from "../Response";




const GetExplores = async (req: Request, res: Response) => {

    try {
        const ExploreList = await ExploreModel.find({});
        res.status(200).send(ResultLoader("All Explore",ExploreList));
    } catch (e: any) {
        res.status(404).send(ErrorLoader("ExploreList not found",e.message));
    }



}



const GetExplore = async (req: Request, res: Response) => {

    try {

        const {_id}=req.params;
        // console.log(name);

        const Explore = await ExploreModel.findOne({_id});

        if(Explore===null){
            return res.status(404).send(ErrorLoader("Explore Not Found","Not Found"))
        }

        res.status(200).send(ResultLoader("Explore",Explore));

    } catch (e: any) {



        res.status(404).send(ErrorLoader("Explore not found",e.message));

    }



}


const AddExplore = async (req: Request, res: Response) => {

    try {

        let newExplore: Explore = req.body;

        if (!newExplore) {
            return res.status(500).send(ErrorLoader("Invalid Input","Input"))
        }


        newExplore = {
            image: '',
            tweets:[],
            ...newExplore,
        }



        const newDoc = new ExploreModel(newExplore);

        const Explore = await newDoc.save();


        res.status(200).send(ResultLoader("Explore Added",Explore));
    } catch (e: any) {

        res.status(404).send(ErrorLoader(e.message,"Error"));

    }

}



const DeleteExplore = async (req: Request, res: Response) => {

    try {
        let {_id} = req.body;
        const ExploreDelete = await ExploreModel.deleteOne({_id});
        res.status(200).send(ResultLoader("Explores Deleted",ExploreDelete));

    } catch (e: any) {
        
        res.status(404).send(ErrorLoader("ExploreList not found",e.message));

    }
}



const UpdateExplore = async (req: Request, res: Response) => {

    try {
        let {before,after} = req.body;

        const {_id,user_id,type}=before;

        const newExplore:Explore=after;

        let Explore=await ExploreModel.findOne({_id});

        switch (type) {

            case "tweet":
                Explore.tweets.push(user_id);
                await Explore.save();
            break;
            case "remove tweet":
                Explore.tweets.pull(user_id);
                await Explore.save();
            break;
            case "any":
                await ExploreModel.findOneAndUpdate({ _id }, newExplore); 
                Explore=await ExploreModel.findOne({_id});   
            break;
            default:
                return res.status(500).send(ErrorLoader("Invalid Input","Input"))


        }

        res.status(200).send(ResultLoader("Explores Updated",Explore));

    } catch (e: any) {
        
        res.status(404).send(ErrorLoader("ExploreList not found",e.message));

    }
}




export { GetExplores, AddExplore ,DeleteExplore,UpdateExplore ,GetExplore};


