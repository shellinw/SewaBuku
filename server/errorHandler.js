const errorhandler = (err, req, res, next) => {
    let status = 500;
    let message = "Internal Server Error";

    if (err.message == "NotFound") {
        status = 404;
        message = "Data not found";
    }
    if (
        err.message ==
        "Tanggal Kembali Tidak Boleh Lebih Awal Dari Tanggal Pinjam."
    ) {
        status = 400;
        message = "Tanggal Kembali Tidak Boleh Lebih Awal Dari Tanggal Pinjam.";
    }

    res.status(status).json({ message });
};
module.exports = errorhandler;
