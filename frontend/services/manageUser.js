import axios from 'axios';
import { DEVICE_IP } from '@env'



export const createUser = async (username, password) => {
  try {
    const response = await axios.post(`${DEVICE_IP}:3000/db/user/signup`, {
      username,
      password,
    });
    if (response.status === 201) {
      return "Success";
    } else {
      throw new Error("Failed to create user");
    }
  } catch (error) {
    console.error("Error at service create user:", error);
    throw error;
  }
};