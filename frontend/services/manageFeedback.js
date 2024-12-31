import axios from 'axios';
import { DEVICE_IP } from '@env'

export const checkExistingFeedback = async (complaint_id) => {
    try {
        const response = await axios.get(`${DEVICE_IP}:3000/db/feedback/check/${complaint_id}`);
        if (response.status == 204) {
            return "empty"
        }else{
            return response.data
        }
    } catch (error) {
        console.error("Error checking existing feedback:", error.message);
    }
};

export const createFeedback = async (user_id, complaint_id, rate, desc) => {
    try{
        const response = await axios.post(`${DEVICE_IP}:3000/db/feedback/create`, {
            user_id, 
            complaint_id, 
            rate, 
            desc
        });
        if(response.status === 201){
            console.log("create success")
            return "Success"
        }
    }catch(error){
        console.error("Error create form:", error.message)
    }
}