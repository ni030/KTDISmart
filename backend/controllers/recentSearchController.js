const recentSearchController = {
    fetchRecentSearch: async (req, res) => {
        const { user_id } = req.params;
        try {
            // Query to fetch recent searches
            const query = await req.sql`SELECT latitude,longitude,address FROM recentsearch
                                         WHERE user_id = ${user_id} 
                                         ORDER BY searchtime DESC 
                                         LIMIT 3`;

            // Check if query returned results
            if (query.length === 0) {
                console.log("Recent searches not found");
                return res.status(204).json({ message: "No recent searches for this user" }); // Return to stop further execution
            }

            console.log('Recent search locations:', query);
            return res.status(200).json({ locations: query }); // Return after sending response

        } catch (error) {
            console.log('Error fetching recent searches', error);
            return res.status(500).json({ message: 'Error fetching recent searches' }); // Return after sending response
        }s
    }
};

module.exports = recentSearchController;