import React, { useState, useEffect } from "react";

const BukuCard = () => {
    return (
        <div className="book-card">
            <div className="book-title">Judul Buku: </div>
            <div className="book-author">Penulis: </div>
            <div className="book-price">Tarif Per Hari: Rp </div>
            <button className="rent-button">Sewa</button>
        </div>
    );
};

export default BukuCard;
