const { calculateTotalRent } = require("../helper");
const { Buku } = require("../models/index");

class Controller {
    static async getBuku(req, res, next) {
        try {
            const dataBuku = await Buku.findAll();
            res.status(200).json({
                message: "Success",
                data: dataBuku,
            });
        } catch (err) {
            next(err);
        }
    }
    static async sewaBuku(req, res, next) {
        try {
            const { id } = req.params;
            const { tglPinjam, tglKembali } = req.body;
            const buku = await Buku.findByPk(id);
            if (!buku) {
                throw new Error("NotFound");
            }
            const tarif = buku.tarifPerHari;

            //function to count totalPrice here
            const tarifSewa = calculateTotalRent(tglPinjam, tglKembali, tarif);
            res.status(201).json({
                message: "Success",
                book: buku,
                tarif: tarifSewa,
            });
        } catch (err) {
            next(err);
        }
    }
}

module.exports = Controller;
