const { Buku } = require("../models/index");

class Controller {
    static async getBuku(req, res, next) {
        try {
            const dataBuku = await Buku.findAll();
            res.status(200).json({
                message: "Success",
                data: dataBuku,
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Controller;
