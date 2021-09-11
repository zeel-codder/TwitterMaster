interface ErrorSchema{
    message: string;
    type:string;
}

interface ValidResponse {

    message:string;
    data:any;
    
}

export {ErrorSchema,ValidResponse};