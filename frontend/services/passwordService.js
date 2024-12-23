import axios from "axios";
import { DEVICE_IP } from "@env";

export const passwordService = {
  checkEmailExistence: async (data) => {
    console.log("checkEmailExistence -> " + JSON.stringify(data));
    try {
      const response = await axios.post(
        `${DEVICE_IP}:3000/db/password/checkEmailExistence`,
        data
      );
      console.log("res in service", response.data.exists);
      return response.data;
    } catch (error) {
      console.error("Error in checkEmailExistence in service:", error);
    }
  },
  resetPassword: async (data) => {
    console.log("resetPassword -> " + JSON.stringify(data));
    try {
      const response = await axios.post(
        `${DEVICE_IP}:3000/db/password/resetPassword`,
        data
      );
      console.log("res in resetPassword service", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in resetPassword service:", error);
      return { success: false, message: "Failed to reset password" };
    }
  },
};

export default passwordService;
