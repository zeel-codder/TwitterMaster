import mongoose from "mongoose";
import { Response, Request } from 'express';
import { UserModel } from '../../database/Schema';

import { ValidResponse, ErrorSchema } from '../../interface/Response';
import { User } from '../../interface/database/Schema';
import { ErrorLoader,ResultLoader } from "../Response";




const GetUsers = async (req: Request, res: Response) => {

    try {

        const UserList = await UserModel.find({});

        res.status(200).send(ResultLoader("All Users",UserList));

    } catch (e: any) {



        res.status(404).send(ErrorLoader("UserList not found",e.message));

    }



}



const GetUser = async (req: Request, res: Response) => {

    try {

        const {name}=req.params;
        console.log(name);

        const User = await UserModel.findOne({name:name});

        res.status(200).send(ResultLoader("User",User));

    } catch (e: any) {



        res.status(404).send(ErrorLoader("User not found",e.message));

    }



}


const AddUser = async (req: Request, res: Response) => {

    try {

        let newUser: User = req.body;

        console.log(newUser);

        if (!newUser || !newUser.name || !newUser.email) {
            // const error: ErrorSchema = {
            //     message: "Invalid Input",
            //     type: "Input",
            // }
            return res.status(500).send(ErrorLoader("Invalid Input","Input"))
        }


        const findByName = await UserModel.findOne({ name: newUser.name }).exec();
        const findByEmail = await UserModel.findOne({ email: newUser.email }).exec();

        if (findByName || findByEmail) {
            // throw new Error("User Name and Email Exits");
            return res.status(500).send(ErrorLoader("User Name and Email Exits","UserFound"))
        }

        newUser = {
            image: '',
            follow: [],
            followers: [],
            ...newUser,
        }



        const newDoc = new UserModel(newUser);

        const user = await newDoc.save();

        const result: ValidResponse = {
            message: "User Added",
            data: user
        }

        res.status(200).send(result);
    } catch (e: any) {

        // const error: ErrorSchema = {
        //     message: "User Found",
        //     type: e.message
        // }


        res.status(404).send(ErrorLoader(e.message,"Error"));

    }

}



const DeleteUser = async (req: Request, res: Response) => {

    try {
        let {name} = req.body;
        const UserDelete = await UserModel.deleteOne({name});
        res.status(200).send(ResultLoader("Users Deleted",UserDelete));

    } catch (e: any) {
        
        res.status(404).send(ErrorLoader("UserList not found",e.message));

    }
}



const UpdateUser = async (req: Request, res: Response) => {

    try {
        let {before,after} = req.body;

        const name=before.name ;
        const newUser:User=after;

        const UserDelete = await UserModel.findOneAndUpdate({name}, newUser);
        res.status(200).send(ResultLoader("Users Updated",UserDelete));

    } catch (e: any) {
        
        res.status(404).send(ErrorLoader("UserList not found",e.message));

    }
}




export { GetUsers, AddUser ,DeleteUser,UpdateUser ,GetUser};


