import axios from 'axios';
import { DEVICE_IP } from '@env';

export const passwordService = {
    
    checkEmailExistence: async (data) => {
        try {
            const response = await axios.post(`${DEVICE_IP}:3000/db/password/checkEmailExistence`, {data});
            console.log("res in service", response.data.exists);
            return response.data;
        } catch (error) {
            console.error('Error in checkEmailExistence in service:', error);
        }
    }
};

export default passwordService;
