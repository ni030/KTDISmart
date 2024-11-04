const chooseRoomFormController = {
    getForm: async (req, res) => {
        const { matricNum } = req.params;
        try {
            const response = await req.sql`SELECT * FROM chooseroomform WHERE matricnumber = ${matricNum}`;
            if (response.length === 0) {
                console.log("empty in server")
                res.status(204).json({ message: "No form found" });
            } else {
                console.log("found in server")
                res.json(response);
            }
        } catch (error) {
            console.error("Error during get form:", error);
            res.status(500).json({ message: "Get form failed", error: error.message });
        }
    },

    createForm: async (req, res) => {
        console.log("create form backend")
        const { matricNo, stBlock, stType, ndBlock, ndType, rdBlock, rdType } = req.body;
        try {
           const response = await req.sql`
           INSERT INTO chooseroomform (matricnumber, roomblock1, roomtype1, roomblock2, roomtype2, roomblock3, roomtype3) VALUES (${matricNo}, ${stBlock}, ${stType}, ${ndBlock}, ${ndType}, ${rdBlock}, ${rdType}) `;
           res.status(201).json({ message: "Create successful" })
        } catch(error) {
            console.error("Error during create form:", error);
            res.status(500).json({ message: "Create form failed", error: error.message });
        }
    },

    updateForm: async (req, res) => {
        const { matricNum } = req.params
        const {stBlock, stType, ndBlock, ndType, rdBlock, rdType } = req.body;
        try {
            const response = await req.sql`
            UPDATE chooseroomform 
            SET roomblock1 = ${stBlock}, roomtype1 = ${stType}, roomblock2 = ${ndBlock}, roomtype2 = ${ndType}, roomblock3 = ${rdBlock}, roomtype3 = ${rdType} 
            WHERE matricnumber = ${matricNum}`;
            res.status(200).json({ message: "Update successful" });
        } catch(error) {
            console.error("Error during update form:", error);
            res.status(500).json({ message: "Update form failed", error: error.message });
        }
    }
}

module.exports = chooseRoomFormController