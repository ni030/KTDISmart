import axios from 'axios';
import { DEVICE_IP } from '@env'

export const createEvent = async (eventName, category, role, dateStart, dateEnd, user_id) => {
    console.log("user_id: ", user_id)
    try{
        const response = await axios.post(`${DEVICE_IP}:3000/db/event/create`, {
            eventName,
            category,
            role,
            dateStart,
            dateEnd,
            user_id
        });
        if(response.status === 201){
            console.log("in service: ", response.data)
            return response.data
        }
    }catch(error){
        console.error("Error create event in service:", error.message)
    }
}

export const checkDuplicateEventName = async (eventName) => {
    try{
        const response = await axios.get(`${DEVICE_IP}:3000/db/event/checkDup/${eventName}`);
        if(response.status === 204){
            return false
        }else{
            return true
        }
    }catch(error){
        console.error("Error check duplicate event name in service:", error.message)
    }
}

export const getEvent = async (id) => {
    // console.log("ip: ", DEVICE_IP)
    try{
        const response = await axios.get(`${DEVICE_IP}:3000/db/event/get/${id}`);
        if(response.status === 200){
            return response.data
        }
    }catch(error){
        console.error("Error get event in service:", error.message)
    }
}

export const getEventList = async (user_id) => {
    try{
        console.log("get event list in service")
        const response = await axios.get(`${DEVICE_IP}:3000/db/event/getList/${user_id}`);
        if(response.status === 200){
            return response.data
        }
    }catch(error){
        console.error("Error get event list in service:", error.message)
    }
}