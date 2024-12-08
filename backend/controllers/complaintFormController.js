const complaintFormController = {
    getForm: async (req, res) => {
        const { userId } = req.params;
        try {
            const response = await req.sql`SELECT * FROM complaintform WHERE user_id = ${userId}`;
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
        const { userId, cat, type, desc, pic, randomStatus, createdTime, constructorTime, completedTime } = req.body;
        try {
           const response = await req.sql`
           INSERT INTO complaintform (user_id, category, defecttype, description, complaintImage, status, created_time, estimated_time, completed_time) VALUES (${userId}, ${cat}, ${type}, ${desc}, ${pic}, ${randomStatus}, ${createdTime}, ${constructorTime}, ${completedTime}) `;
           res.status(201).json({ message: "Create successful" })
        } catch(error) {
            console.error("Error during create form:", error);
            res.status(500).json({ message: "Create form failed", error: error.message });
        }
    },

    // updateForm: async (req, res) => {
    //     const { matricNum } = req.params
    //     const {cat, type, desc, pic } = req.body;
    //     try {
    //         const response = await req.sql`
    //         UPDATE complaintform 
    //         SET matricnumber = ${matric}, category = ${cat}, defecttype = ${type}, description = ${desc}, complaintImage = ${pic} 
    //         WHERE matricnumber = ${matricNum}`;
    //         res.status(200).json({ message: "Update successful" });
    //     } catch(error) {
    //         console.error("Error during update form:", error);
    //         res.status(500).json({ message: "Update form failed", error: error.message });
    //     }
    // }
}

module.exports = complaintFormController