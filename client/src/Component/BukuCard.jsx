import React, { useState, useEffect } from "react";
import { formatRupiah } from "../../helper";
const BukuCard = ({ buku }) => {
    const { judul, penulis, tarifPerHari, id } = buku;
    const [tglPinjam, setTglPinjam] = useState("");
    const [tglKembali, setTglKembali] = useState("");
    const [totalSewa, setTotalSewa] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const handleSewaClick = () => {
        setIsFormVisible(true);
    };

    const confirmSewa = () => {
        if (!totalSewa) {
            alert("Error: Tanggal masih kosong.");
        } else {
            alert("Sukses Sewa Buku");

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!tglPinjam || !tglKembali) {
            alert("Please select both start and return dates.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/rent/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tglPinjam,
                    tglKembali,
                }),
            });

            // Check if the response is not ok (i.e., not in the 2xx range)
            if (!response.ok) {
                const errorData = await response.json(); // Get the error message from the response
                throw new Error(
                    errorData.message || "Something went wrong on the server."
                );
            }
            const data = await response.json();
            setTotalSewa(data.tarif);
        } catch (error) {
            console.error("Error:", error.message);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div className="book-card" key={id}>
            <div className="book-title">
                Judul:
                <div className="content-title">{judul}</div>
            </div>
            <div className="book-author">Penulis: {penulis}</div>
            <div className="book-price">
                Tarif Per Hari:
                <div>{formatRupiah(tarifPerHari)}</div>
            </div>
            {isFormVisible === true ? (
                <></>
            ) : (
                <>
                    {" "}
                    <button className="rent-button" onClick={handleSewaClick}>
                        Sewa
                    </button>
                </>
            )}

            {isFormVisible && (
                <form onSubmit={handleSubmit} className="rent-form">
                    <div className="label-date">
                        <label htmlFor="tglPinjam">Start Date</label>
                        <input
                            type="date"
                            id="tglPinjam"
                            value={tglPinjam}
                            onChange={(e) => setTglPinjam(e.target.value)}
                        />
                    </div>
                    <div className="label-date">
                        <label htmlFor="tglKembali">Return Date</label>
                        <input
                            type="date"
                            id="tglKembali"
                            value={tglKembali}
                            onChange={(e) => setTglKembali(e.target.value)}
                        />
                    </div>
                    <div className="confirm-button">
                        <button type="submit">Calculate Total Rent</button>
                    </div>
                </form>
            )}

            {totalSewa !== null && (
                <div className="total-rent">
                    Total Sewa: <strong>{formatRupiah(totalSewa)}</strong>
                </div>
            )}
            {isFormVisible === false ? (
                <></>
            ) : (
                <>
                    <button className="rent-button" onClick={confirmSewa}>
                        Sewa Sekarang
                    </button>
                </>
            )}
        </div>
    );
};
export default BukuCard;
