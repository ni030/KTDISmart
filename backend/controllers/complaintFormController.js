const complaintFormController = {
    getForm: async (req, res) => {
        const { userId } = req.params;

        // Call updateComplaintStatus before fetching forms
        try {
            console.log("Auto-updating complaint statuses...");
            await complaintFormController.updateComplaintStatus(req);
            console.log("Complaint statuses updated automatically.");
        } catch (error) {
            console.error("Error during auto-update of complaint statuses:", error.message);
            return res.status(500).json({ message: "Failed to update complaint statuses" });
        }

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

    cancelComplaint: async(req, res) => {
        console.log("cancel form backend")
        const { complaintid } = req.params;
        try {
            const response = await req.sql`
            UPDATE complaintform
                    SET status = 'cancelled'
                    WHERE complaintid = ${complaintid} `;
            res.status(200).json({ message: "Cancelled successful" })
         } catch(error) {
             console.error("Error during cancel:", error);
             res.status(500).json({ message: "Cancel complaint failed", error: error.message });
         }

    },

    createForm: async (req, res) => {
        console.log("create form backend")
        const { userId, cat, type, desc, pic, randomStatus, createdTime, constructorTime, completedTime, is_resubmit, parent_id } = req.body;
        try {
            if (is_resubmit && parent_id) {
                console.log(`Attempting to cancel parent complaint with ID: ${parent_id}`);
                try {
                    await req.sql`
                    UPDATE complaintform
                    SET status = 'cancelled'
                    WHERE complaintid = ${parent_id}`;
                    console.log("Parent complaint cancelled successfully.");
                } catch (cancelError) {
                    console.error("Error cancelling parent complaint:", cancelError);
                    return res.status(500).json({ message: "Failed to cancel parent complaint", error: cancelError.message });
                }
            }
           const response = await req.sql`
           INSERT INTO complaintform (user_id, category, defecttype, description, complaintImage, status, created_time, estimated_time, completed_time, is_resubmitted, parent_id) VALUES (${userId}, ${cat}, ${type}, ${desc}, ${pic}, ${randomStatus}, ${createdTime}, ${constructorTime}, ${completedTime}, ${is_resubmit}, ${parent_id}) `;
           res.status(201).json({ message: "Create successful" })
        } catch(error) {
            console.error("Error during create form:", error);
            res.status(500).json({ message: "Create form failed", error: error.message });
        }
    },

    updateComplaintStatus: async (req) => {
        console.log("Running scheduled task: Updating complaint statuses...");
        try {
            const complaints = await req.sql`
            SELECT complaintID, estimated_time FROM complaintform 
            WHERE status = 'constructor assigned'`;

            const currentTime = new Date();
            

            for (const complaint of complaints) {
                if (new Date(complaint.estimated_time) < currentTime) {
                    await req.sql`
                    UPDATE complaintform
                    SET status = 'expired'
                    WHERE complaintid = ${complaint.complaintid}`;
                    console.log("Complaint statuses change.");
                }
            }
            console.log("Complaint statuses updated successfully.");
        } catch (error) {
            console.error("Error updating complaint statuses:", error);
        }
    },
}

module.exports = complaintFormController