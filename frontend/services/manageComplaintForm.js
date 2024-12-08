import axios from 'axios';
import { DEVICE_IP } from '@env'

export const checkExistingForm = async (userId) => {
    try {
        const response = await axios.get(`${DEVICE_IP}:3000/db/complaint/check/${userId}`);
        if (response.status == 204) {
            return "empty"
        }else{
            return response.data
        }
    } catch (error) {
        console.error("Error checking existing form:", error.message);
    }
};

export const createForm = async(userId, cat, type, desc, pic, randomStatus, createdTime, constructorTime, completedTime)=> {

    try{
        const response = await axios.post(`${DEVICE_IP}:3000/db/complaint/create`, {
            userId,
            cat,
            type,
            desc,
            pic, 
            randomStatus,
            createdTime, 
            constructorTime, 
            completedTime
        });
        if(response.status === 201){
            console.log("create success")
            return "Success"
        }
    }catch(error){
        console.error("Error create form:", error.message)
    }
}

// export const updateForm = async (matric, cat, type, desc, pic) => {
//     try{
//         const response = await axios.put(`${DEVICE_IP}:3000/db/complaint/update/${matric}`, {
//             cat,
//             type,
//             desc,
//             pic
//         });
//         if(response.status === 200){
//             return "Success"
//         }
//     }catch(error){
//         console.error("Error update form:", error.message)
//     }
// }