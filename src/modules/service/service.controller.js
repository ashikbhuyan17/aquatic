const Service = require("./service.model")

const createService = async (req, res) => {
    const { service_name, description } = req.body
    console.log(service_name);
    try {
        const created = await Service.create({
            service_name,
            description
        })
        console.log("created", created)
        if (!created) {
            res.status(409).json({ error: "Service created." });
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

module.exports.createService = createService;