import axios from 'axios';
import { DEVICE_IP } from '@env'

export const recordMerit = async (user_id, event) => {
    try{
        console.log("user_id", user_id)
        const existRecords = await getMeritRecords(user_id);
        let found = false;
        if(existRecords){
            for(let i = 0; i < existRecords.length; i++){
                if(existRecords[i].eventid === event.eventid){
                    found = true
                    break
                }
            }
        }

        if(!found){
            const response = await axios.post(`${DEVICE_IP}:3000/db/ktdiMerit/record/${user_id}`, {
                event
            });
            if(response.status == 201 || response.status == 200){
                calcScore(user_id)
                return "success"
            }
        }else{
            return "found"
        }
    }catch(error){
        console.error("Error record merit in service:", error.message)
    }
}

export const getMeritRecords = async (user_id) => {
    try{
        const response = await axios.get(`${DEVICE_IP}:3000/db/ktdiMerit/get/${user_id}`);
        if(response.data.length > 0){
            return response.data[0].events
        }
    }catch(error){
        console.error("Error get merit records in service:", error.message)
    }
}

export const calcScore = async (user_id) => {
    try{
        const records = await getMeritRecords(user_id);
        let score = 0;

        if(records){
            for(let i = 0; i < records.length; i++){
                if(records[i].role == "Committee"){
                    score += 5
                }else if(records[i].role == "Participant"){
                    score += 1
                }
            }
        }
        
        const response = await axios.put(`${DEVICE_IP}:3000/db/ktdiMerit/update/${user_id}`, {
            score
        });

        if(response.status == 200){
            return "scoreUpdated"
        }

    }catch(error){
        console.error("Error update score in service:", error.message)
    }
}

export const getPersonalMeritDetail = async (user_id) => {
    console.log("ip: ", DEVICE_IP)
    try{
        const response = await axios.get(`${DEVICE_IP}:3000/db/ktdiMerit/detail/${user_id}`);
        if(response.status == 200){
            return response.data
        }
    }catch(error){
        console.error("Error get personal merit detail in service:", error.message)
    }
}

export const calcBatch = async (user_id) => {
    try{
        let numRank = 0;
        let i = 0;
        const ranking = await axios.get(`${DEVICE_IP}:3000/db/ktdiMerit/ranking`);
        while(i <= ranking.data.length){
            numRank++
            if(ranking.data[i].user_id == user_id){
                break
            }
            i++
        }

        //Determine batch
        
        //if number rank is top 3, return 1
        if(numRank > 0 && numRank <= 3){
            return 1
        }else if(numRank > 3 && numRank <= 5){
            return 2
        }else{
            return 3
        }

    }catch{
        console.error("Error calculate batch in service:", error.message)
    }
}

