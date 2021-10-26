import {  ErrorSchema ,ValidResponse} from '../interface/Response';



const ErrorLoader = (message:string,type:string) :ErrorSchema=>{
    
    const result:ErrorSchema = { message , type};

    return result;
}

const ResultLoader = (message:string,data:any) :ValidResponse=>{
    
    const result:ValidResponse = { message , data};

    return result;
}

const DataLength=10;


function CropData(List:any,number:number){
    return Array.from(List).slice(number-DataLength,number);
}


export {ErrorLoader,ResultLoader,DataLength,CropData};