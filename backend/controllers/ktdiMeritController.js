const ktdiMeritController = {
    recordMerit: async (req, res) => {
        const { user_id } = req.params;
        const { event } = req.body; 

        try {
            const check = await req.sql`SELECT * FROM ktdimerit WHERE user_id = ${user_id};`;

            if (check.length === 0) {
                console.log("inserting");
                const response = await req.sql`
                    INSERT INTO ktdimerit (user_id, events) 
                    VALUES (${user_id}, ARRAY[${JSON.stringify(event)}::jsonb])
                `;
                res.status(201).json(response);
            } else {
                console.log("updating");
                const response = await req.sql`
                    UPDATE ktdimerit 
                    SET events = array_append(events, ${JSON.stringify(event)}::jsonb) 
                    WHERE user_id = ${user_id}
                `;
                res.status(200).json(response);
            }
        } catch (error) {
            console.error("Error during record merit:", error);
            res.status(500).json({ message: "Record merit failed", error: error.message });
        }
    },

    getMeritRecords: async (req, res) => {
        const { user_id } = req.params;
        try {
            const response = await req.sql`SELECT events FROM ktdimerit WHERE user_id = ${user_id}`;
            res.status(200).json(response);
        } catch (error) {
            console.error("Error during get merit records:", error);
            res.status(500).json({ message: "Get merit records failed", error: error.message });
        }
    },

    updateScore: async (req, res) => {
        const {score} = req.body;
        const {user_id} = req.params;
        try {
            const response = await req.sql`
                UPDATE ktdimerit
                SET score = ${score}
                WHERE user_id = ${user_id}
            `;
            res.status(200).json(response);
        } catch (error) {
            console.error("Error during update score:", error);
            res.status(500).json({ message: "Update score failed", error: error.message });
        }
    },

    getPersonalMeritDetail: async (req, res) => {
        const { user_id } = req.params;
        try {
            const response = await req.sql`
                SELECT * FROM ktdimerit WHERE user_id = ${user_id}
            `;
            res.status(200).json(response);
        } catch (error) {
            console.error("Error during get ktdi merit detail:", error);
            res.status(500).json({ message: "Get ktdi merit detail failed", error: error.message });
        }
    },

    getMeritRanking: async (req, res) => {
        try {
            const response = await req.sql`
                SELECT user_id, score FROM ktdimerit
                ORDER BY score DESC
            `;
            if (response.length === 0) {
                res.status(404).json({ message: "No merit ranking found" });
            } else {
                res.status(200).json(response);
            }
        } catch (error) {
            console.error("Error during get merit ranking:", error);
            res.status(500).json({ message: "Get merit ranking failed", error: error.message });
        }
    }
};

module.exports = ktdiMeritController;