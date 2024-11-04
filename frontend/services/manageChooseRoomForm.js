import axios from 'axios';

export const checkExistingForm = async (matricNum) => {
    try {
        const response = await axios.get(`http://10.0.2.2:3000/db/chooseRoom/check/${matricNum}`);
        if (response.status == 204) {
            return "empty"
        }else{
            return response.data
        }
    } catch (error) {
        console.error("Error checking existing form:", error.message);
    }
};

export const createForm = async (matricNo, stBlock, stType, ndBlock, ndType, rdBlock, rdType) => {
    try{
        const response = await axios.post(`http://10.0.2.2:3000/db/chooseRoom/create`, {
            matricNo,
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
        console.error("Error create form:", error,message)
    }
}

export const updateForm = async (matricNo, stBlock, stType, ndBlock, ndType, rdBlock, rdType) => {
    try{
        const response = await axios.put(`http://10.0.2.2:3000/db/chooseRoom/update/${matricNo}`, {
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