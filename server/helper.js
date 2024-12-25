function calculateTotalRent(tglPinjam, tglKembali, tarifPerHari) {
    const startDate = new Date(tglPinjam);
    const endDate = new Date(tglKembali);

    //validasi tgl pengembalian.
    if (endDate < startDate) {
        throw new Error(
            "Tanggal Kembali Tidak Boleh Lebih Awal Dari Tanggal Pinjam."
        );
    }

    //hitung masa pinjam
    const numDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

    //hitung total rent
    const totalRent = numDays * tarifPerHari;

    return totalRent;
}

module.exports = { calculateTotalRent };
