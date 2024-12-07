const chooseRoomFormController = {
    getForm: async (req, res) => {
        const { user_id } = req.params;
        try {
            const response = await req.sql`SELECT * FROM chooseroomform WHERE user_id = ${user_id}`;
            if (response.length === 0) {
                res.status(204).json({ message: "No form found" });
            } else {
                res.json(response);
            }
        } catch (error) {
            console.error("Error during get form:", error);
            res.status(500).json({ message: "Get form failed", error: error.message });
        }
    },

    createForm: async (req, res) => {
        const { user_id, stBlock, stType, ndBlock, ndType, rdBlock, rdType } = req.body;
        try {
           const response = await req.sql`
           INSERT INTO chooseroomform (user_id, roomblock1, roomtype1, roomblock2, roomtype2, roomblock3, roomtype3) VALUES (${user_id}, ${stBlock}, ${stType}, ${ndBlock}, ${ndType}, ${rdBlock}, ${rdType}) `;
           res.status(201).json({ message: "Create successful" })
        } catch(error) {
            console.error("Error during create form:", error);
            res.status(500).json({ message: "Create form failed", error: error.message });
        }
    },

    updateForm: async (req, res) => {
        const { user_id } = req.params
        const {stBlock, stType, ndBlock, ndType, rdBlock, rdType } = req.body;
        try {
            const response = await req.sql`
            UPDATE chooseroomform 
            SET roomblock1 = ${stBlock}, roomtype1 = ${stType}, roomblock2 = ${ndBlock}, roomtype2 = ${ndType}, roomblock3 = ${rdBlock}, roomtype3 = ${rdType} 
            WHERE user_id = ${user_id}`;
            res.status(200).json({ message: "Update successful" });
        } catch(error) {
            console.error("Error during update form:", error);
            res.status(500).json({ message: "Update form failed", error: error.message });
        }
    }
}

module.exports = chooseRoomFormController