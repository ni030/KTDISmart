const eventController = {
    createEvent: async (req, res) => {
        const {eventName, category, role, dateStart, dateEnd, user_id} = req.body;
        try{
            const response = await req.sql`
            INSERT INTO event (eventname, category, role, startdate, enddate, user_id) 
            VALUES (${eventName}, ${category}, ${role}, ${dateStart}, ${dateEnd}, ${user_id}) 
            RETURNING eventid`;
            const eventId = response[0].eventid; 
            res.status(201).json({ eventId });
        } catch(error) {
            console.error("Error during create event:", error);
            res.status(500).json({ message: "Create event failed", error: error.message });
        }
    },
    checkDup: async (req, res) => {
        const {eventName} = req.params;
        try{
            const response = await req.sql`SELECT * FROM event WHERE eventname = ${eventName}`;
            if(response.length === 0) {
                res.status(204).json({ message: "No duplicate event name found" });
            }else{
                res.status(200).json(response);
            }
        } catch(error) {
            console.error("Error during check duplicate event name:", error);
            res.status(500).json({ message: "Check duplicate event name failed", error: error.message });
        }
    },
    getEvent: async (req, res) => {
        const {id} = req.params;
        try{
            const response = await req.sql`SELECT * FROM event WHERE eventid = ${id}`;
            res.status(200).json(response);
        } catch(error) {
            console.error("Error during get event:", error);
            res.status(500).json({ message: "Get event failed", error: error.message });
        }
    },
    getEventList: async (req, res) => {
        const {user_id} = req.params;
        try{
            const response = await req.sql`SELECT * FROM event WHERE user_id = ${user_id}`;
            res.status(200).json(response);
        } catch(error) {
            console.error("Error during get event list:", error);
            res.status(500).json({ message: "Get event list failed", error: error.message });
        }
    }
}

module.exports = eventController;