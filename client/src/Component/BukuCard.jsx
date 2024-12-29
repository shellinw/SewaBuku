import React, { useState, useEffect } from "react";
import { formatRupiah, calculateDateDifference } from "../../helper";
const BukuCard = ({ buku }) => {
    const { judul, penulis, tarifPerHari, id } = buku;
    const [tglPinjam, setTglPinjam] = useState("");
    const [tglKembali, setTglKembali] = useState("");
    const [totalSewa, setTotalSewa] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [errMessage, setErrMessage] = useState("");
    const [days, setDays] = useState(0);

    //render totalSewa sesuai tgl input
    useEffect(() => {
        if (tglPinjam && tglKembali) {
            if (tglKembali < tglPinjam) {
                setErrMessage(
                    "Error: Tanggal Kembali tidak bisa lebih awal dari Tanggal Pinjam."
                );
                setTotalSewa(null);
                setTimeout(() => {
                    setErrMessage("");
                }, 3000);
            }
            const days = calculateDateDifference(tglPinjam, tglKembali);
            if (days > 0) {
                setTotalSewa(days * tarifPerHari);
                setDays(days);
            } else {
                setTotalSewa(null);
            }
        }
    }, [tglPinjam, tglKembali]);

    //form sewa
    const handleSewaClick = () => {
        setIsFormVisible(true);
    };

    //success and error
    const SuccessAlert = () => {
        return <div className="success-alert">Sewa Berhasil!</div>;
    };
    const ErrorAlert = () => {
        return <div className="error-alert">{errMessage}</div>;
    };

    //confirm totalSewa from server
    // const confirmSewa = () => {
    //     if (!totalSewa) {
    //         setErrMessage("Error: Tarif Belum Terhitung");
    //         setTimeout(() => {
    //             setErrMessage("");
    //         }, 3000);
    //     } else {
    //         setSuccessAlert(true);

    //         setTimeout(() => {
    //             setSuccessAlert(false);
    //             window.location.reload();
    //         }, 3000);
    //     }
    // };

    //hit endpoint
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!tglPinjam || !tglKembali) {
            setErrMessage(
                "Error:Tanggal Pinjam dan Tanggal Kembali Belum diisi."
            );
            setTimeout(() => {
                setErrMessage("");
            }, 3000);
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

            //if response not ok
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            //else
            setSuccessAlert(true);
            setTimeout(() => {
                setSuccessAlert(false);
                window.location.reload();
            }, 3000);
        } catch (error) {
            setErrMessage(error.message);
        }
    };

    return (
        <>
            <div className="book-card" key={id}>
                {successAlert && <SuccessAlert />}
                {errMessage && <ErrorAlert />}
                <div className="book-title">
                    Judul:
                    <div className="content-title">{judul}</div>
                </div>
                <div className="book-author">Penulis: {penulis}</div>
                <div className="book-price">
                    Tarif / Hari:
                    <div>{formatRupiah(tarifPerHari)}</div>
                </div>
                {isFormVisible === true ? (
                    <></>
                ) : (
                    <>
                        <button
                            className="rent-button"
                            onClick={handleSewaClick}
                        >
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
                        {/* <div>
                            <button className="confirm-button" type="submit">
                                Calculate Total Rent
                            </button>
                        </div> */}
                    </form>
                )}

                {totalSewa !== null && (
                    <>
                        <div className="detail-rent">
                            <div className="detail-rent-subtitle">Rincian:</div>
                            {days} hari x {formatRupiah(tarifPerHari)}
                        </div>
                        <div className="total-rent">
                            Total Sewa:{" "}
                            <strong>{formatRupiah(totalSewa)}</strong>
                        </div>
                    </>
                )}
                {isFormVisible === false ? (
                    <></>
                ) : (
                    <>
                        <button className="rent-button" onClick={handleSubmit}>
                            Sewa Sekarang
                        </button>
                    </>
                )}
            </div>
        </>
    );
};
export default BukuCard;
