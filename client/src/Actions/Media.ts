import axios from "axios";




// Media Upload Api Calls
const UploadImageFile=(formData:FormData)=> axios.post("https://api.cloudinary.com/v1_1/dcgtilnwq/upload",formData);

const UploadVideoFile=(formData:FormData)=> axios.post("https://api.cloudinary.com/v1_1/dcgtilnwq/upload",formData);





export {UploadImageFile,UploadVideoFile};

