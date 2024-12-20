import axios from 'axios';
import { DEVICE_IP } from '@env'

export const saveCurrentLocation = async (user_id, latitude, longitude) => {
    console.log("Saving current location");
    try{
        const response = await axios.post(`${DEVICE_IP}:3000/db/navigation/create/location`,{
            user_id,
            latitude,
            longitude
        });       
        console.log("Location saved successfully",response.data)
    } catch(error){
        console.error("Error saving current location:", error.message)
    }
};

export const saveSearchLocation = async (user_id,latitude,longitude,address) => {
    console.log("Saving searched location");
    try{
        const query = await axios.post(`${DEVICE_IP}:3000/db/navigation/create/search`,{
            user_id,
            latitude,
            longitude,
            address
        });       
        console.log("Searched location saved successfully",query.data)
    }catch(error){
        console.log("Error saving searched location",error);
    }
};

export const fetchSearchLocation = async (user_id) => {
    console.log("Fetching searched location");
    try{
        const response = await axios.get(`${DEVICE_IP}:3000/db/navigation/check/${user_id}`);
        console.log('Fetched recent searched locations:',response.data.locations);
        return response.data.locations;
    }catch(error){
        console.log('Error fetching searched location',error);
    }
};