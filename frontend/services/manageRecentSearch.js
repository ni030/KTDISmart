import axios from 'axios';
import { DEVICE_IP } from '@env'

export const fetchRecentSearch=async(user_id)=>{
    console.log('Fetching recent search for user id: ',user_id)
    try{
        const response = await axios.get(`${DEVICE_IP}:3000/db/recentSearch/fetch/${user_id}`);
        if(response.status === 200){
            return response.data
        }
    }catch(error){
        console.error('Error fetching searched location',error);
    }
}