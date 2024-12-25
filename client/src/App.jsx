import React, { useState, useEffect } from "react";
import BukuCard from "./Component/BukuCard";

function App() {
    const [dataBuku, setDataBuku] = useState([]);
    const getBuku = async () => {
        try {
            const response = await fetch("http://localhost:3000/books");
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getBuku();
    }, []);
    console.log(dataBuku);
    return (
        <>
            <div className="app-container">
                <div className="header">Sewa Buku App</div>
                <div className="sub-header">Explore Koleksi Kami!</div>
                <div className="content">
                    <BukuCard />
                    <BukuCard />
                    <BukuCard />
                    <BukuCard />
                    <BukuCard />
                </div>
            </div>
        </>
    );
}

export default App;
