import axios from 'axios';

export const createUser = async (username, password) => {
  try {
    // Replace with 10.0.2.2 for Android emulator, or your machine's IP for physical devices
    const response = await axios.post("http://10.0.2.2:3000/db/user/signup", {
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