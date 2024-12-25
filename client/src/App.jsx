import React, { useState, useEffect } from "react";
import BukuCard from "./Component/BukuCard";

function App() {
    const [dataBuku, setDataBuku] = useState([]);

    const getBuku = async () => {
        try {
            const response = await fetch("http://localhost:3000/books");
            const jsonData = await response.json();
            setDataBuku(jsonData.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBuku();
    }, []);
    return (
        <>
            <div className="app-container">
                <div className="header">Sewa Buku App</div>
                <div className="sub-header">Explore Koleksi Kami!</div>

                <div className="content">
                    {dataBuku.map((buku) => (
                        <BukuCard key={buku.id} buku={buku} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;
