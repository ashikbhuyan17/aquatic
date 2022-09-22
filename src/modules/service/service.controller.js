const Service = require("./service.model")

const createService = async (req, res) => {
    const { name, description } = req.body
    try {
        const created = await Service.create({
            name,
            description
        })
        if (!created) {
            res.status(409).json({ error: "Service not created." });
        }
        res.status(201).json({
            message: "service created",
            created
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", })
    }
}

const getService = async (req, res) => {
    try {
        const services = await Service.findAll()
        if (!services) {
            res.status(404).json({ error: "Data not Found." });
        }
        res.status(201).json({
            message: "Data Found",
            services
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error", })
    }
}

module.exports.createService = createService;
module.exports.getService = getService;
