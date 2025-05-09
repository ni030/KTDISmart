import axios from 'axios';
import { DEVICE_IP } from '@env'

export const checkExistingForm = async (user_id) => {
    console.log("ip: ", DEVICE_IP)
    try {
        const response = await axios.get(`${DEVICE_IP}:3000/db/chooseRoom/check/${user_id}`);
        if (response.status == 204) {
            return "empty"
        }else{
            return response.data
        }
    } catch (error) {
        console.error("Error checking existing form:", error.message);
    }
};

export const createForm = async (user_id, stBlock, stType, ndBlock, ndType, rdBlock, rdType) => {
    try{
        const response = await axios.post(`${DEVICE_IP}:3000/db/chooseRoom/create`, {
            user_id,
            stBlock,
            stType,
            ndBlock,
            ndType,
            rdBlock,
            rdType
        });
        if(response.status === 201){
            console.log("create success")
            return "Success"
        }
    }catch(error){
        console.error("Error create form:", error.message)
    }
}

export const updateForm = async (user_id, stBlock, stType, ndBlock, ndType, rdBlock, rdType) => {
    try{
        const response = await axios.put(`${DEVICE_IP}:3000/db/chooseRoom/update/${user_id}`, {
            stBlock,
            stType,
            ndBlock,
            ndType,
            rdBlock,
            rdType
        });
        if(response.status === 200){
            return "Success"
        }
    }catch(error){
        console.error("Error update form:", error.message)
    }
}