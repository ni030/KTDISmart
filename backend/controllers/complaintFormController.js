const complaintFormController = {
    // getForm: async (req, res) => {
    //     const { matricNum } = req.params;
    //     try {
    //         const response = await req.sql`SELECT * FROM complaintform WHERE matricnumber = ${matricNum}`;
    //         if (response.length === 0) {
    //             console.log("empty in server")
    //             res.status(204).json({ message: "No form found" });
    //         } else {
    //             console.log("found in server")
    //             res.json(response);
    //         }
    //     } catch (error) {
    //         console.error("Error during get form:", error);
    //         res.status(500).json({ message: "Get form failed", error: error.message });
    //     }
    // },

    createForm: async (req, res) => {
        console.log("create form backend")
        const { matric, cat, type, desc, pic } = req.body;
        try {
           const response = await req.sql`
           INSERT INTO complaintform (matricnumber, category, defecttype, description, complaintImage) VALUES (${matric}, ${cat}, ${type}, ${desc}, ${pic}) `;
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