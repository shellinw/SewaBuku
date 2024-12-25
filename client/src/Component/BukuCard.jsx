import React, { useState, useEffect } from "react";

const BukuCard = ({ buku }) => {
    const { judul, penulis, tarifPerHari, id } = buku;

    return (
        <div className="book-card" key={id}>
            <div className="book-title">
                Judul:
                <div className="content-title">{judul}</div>
            </div>
            <div className="book-author">Penulis: {penulis}</div>
            <div className="book-price">
                Tarif Per Hari:
                <div> Rp {tarifPerHari}</div>
            </div>
            <button className="rent-button">Sewa</button>
        </div>
    );
};

export default BukuCard;
