const navigationController = {
    saveCurrentLocation: async(req, res) => {
        const{user_id,latitude,longitude}=req.body;
        if(latitude==null||longitude==null){
            res.status(400).json({message: 'Latitude and longitude are required'});
        }
        try{
            const response = await req.sql`INSERT INTO currentlocation (user_id,latitude,longitude) 
                                        VALUES(${user_id},${latitude},${longitude})`;
            res.status(200).json({ message: 'User location saved successfully' });
        } catch(error){
            console.error('Error saving user location:', error);
            res.status(500).json({ message: 'Error saving user location' });
        }
    },

    saveSearchLocation: async (req, res) => {
        const { user_id, latitude, longitude, address } = req.body;
        console.log(user_id);

        if (latitude == null || longitude == null) {
            res.status(400).json({ message: 'Latitude and longitude are required' });
            return;
        }

        try {
            // Using ON CONFLICT to either insert or update
            const query = await req.sql`
                INSERT INTO recentsearch (user_id, latitude, longitude, address, searchtime)
                VALUES (${user_id}, ${latitude}, ${longitude}, ${address}, NOW())
                ON CONFLICT (user_id, address)
                DO UPDATE SET searchtime = NOW(), latitude = EXCLUDED.latitude, longitude = EXCLUDED.longitude;
            `;
            res.status(200).json({ message: 'Search location saved or updated successfully' });
        } catch (error) {
            console.error('Error saving search location:', error);
            res.status(500).json({ message: 'Error saving search location' });
        }
    }
}

module.exports = navigationController