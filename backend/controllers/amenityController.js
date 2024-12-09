const amenityController = {
    getWaterDispenser: async (req, res) => {
        try{
            const response = await req.sql`SELECT * FROM waterdispenser;`;
            res.status(200).json(response);
        } catch(error) {
            console.error("Error during get water dispenser:", error);
            res.status(500).json({ message: "Get water dispenser failed", error: error.message });
        }
    },
    getRubbishBin: async (req, res) => {
        try{
            const response = await req.sql`SELECT * FROM rubbishbin;`;
            res.status(200).json(response);
        } catch(error) {
            console.error("Error during get rubbish bin:", error);
            res.status(500).json({ message: "Get rubbish bin failed", error: error.message });
        }
    },
    getShop: async (req, res) => {
        try{
            const response = await req.sql`SELECT * FROM shop;`;
            res.status(200).json(response);
        } catch(error) {
            console.error("Error during get shop:", error);
            res.status(500).json({ message: "Get shop failed", error: error.message });
        }
    },
}
module.exports = amenityController