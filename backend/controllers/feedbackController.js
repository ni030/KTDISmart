const feedbackController = {
    getFeedback: async (req, res) => {
        const { complaint_id } = req.params;
        try {
            const response = await req.sql`SELECT * FROM feedback WHERE complaint_id = ${complaint_id}`;
            if (response.length === 0) {
                res.status(204).json({ message: "No feedback found" });
            } else {
                res.json(response);
            }
        } catch (error) {
            console.error("Error during get feedback:", error);
            res.status(500).json({ message: "Get form failed", error: error.message });
        }
    },

    createFeedback: async (req, res) => {
        const { user_id, complaint_id, rate, desc } = req.body;
    
        try {
            // Insert the feedback
            const [newFeedback] = await req.sql`
                INSERT INTO feedback (user_id, complaint_id, rate, description)
                VALUES (${user_id}, ${complaint_id}, ${rate}, ${desc})
            `;
    
            // Update the complaint status to 'rated'
            await req.sql`
                UPDATE complaintform
                SET status = 'rated'
                WHERE complaintid = ${complaint_id}
            `;
    
            res.status(201).json({ message: "Create Feedback and update complaint status successful" });
        } catch (error) {
            console.error("Error during create feedback:", error);
            res.status(500).json({ message: "Create feedback failed", error: error.message });
        }
    }    

    // updateFeedback: async (req, res) => {
    //     const { feedback_id } = req.params
    //     const { rate, desc} = req.body;
    //     try {
    //         const response = await req.sql`
    //         UPDATE feedback 
    //         SET rate = ${rate}, description = ${desc} 
    //         WHERE feedback_id = ${feedback_id}`;
    //         res.status(200).json({ message: "Update Feedback successful" });
    //     } catch(error) {
    //         console.error("Error during update feedback:", error);
    //         res.status(500).json({ message: "Update feedback failed", error: error.message });
    //     }
    // }
}

module.exports = feedbackController