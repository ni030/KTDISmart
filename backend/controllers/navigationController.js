const navigationController = {
    saveCurrentLocation: async(req, res) => {
        const{matricnumber,latitude,longitude}=req.body;

        if(latitude==null||longitude==null){
            res.status(400).json({message: 'Latitude and longitude are required'});
        }
        try{
            const query = await req.sql`INSERT INTO currentlocation (matricnumber,latitude,longitude) 
                                        VALUES(${matricnumber},${latitude},${longitude})`;
            res.status(200).json({ message: 'User location saved successfully' });
        } catch(error){
            console.error('Error saving user location:', error);
            res.status(500).json({ message: 'Error saving user location' });
        }
    },

    saveSearchLocation: async(req, res) => {
        const {matricnumber,latitude,longitude,address}=req.body;
        if(latitude==null||longitude==null){
            res.status(400).json({ message: 'Latitude and longitude are required' });
        }
        try{
            const query = await req.sql`INSERT INTO recentsearches (matricnumber,latitude,longitude,address) 
                                        VALUES(${matricnumber},${latitude},${longitude},${address})`;
            res.status(200).json({message: 'Search location saved'});
        } catch(error){
            console.error('Error saving search location:', error);
            res.status(500).json({ message: 'Error saving search location' });
        }
    },

    fetchSearchLocation: async(req, res) => {
        const {matricnumber} = req.params;
        try{
            const query = await req.sql`SELECT address FROM recentsearches 
                                        WHERE matricnumber = ${matricnumber} 
                                        ORDER BY time at DESC 
                                        LIMIT 3`;
            if(query.length===0){
                console.log("Recent searches not found")
                res.status(404).json({message: "No recent searches for this user"});   
            }
            console.log('Recent search locations:',query);
            res.status(200).json({locations:query});
        } catch(error){
            console.log('Error fetching recent searches',error);
            res.status(500).json({message:'Error fetching recent searches'});
        }
    }
}

module.exports = navigationController