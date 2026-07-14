import React from "react";
import './Chisiamo.css';
const cards = [
    {
        id: 1,
        image: 'im4.jpeg',
        testo: 'Isabella nasce come piccola realtà artigianale, con una grande passione per il ricamo e la creazione di capi unici. Offrendo capi che raccontano storie e emozioni attraverso il ricamo.'
    },
    {
        id: 2,
        image: 'img5.jpeg',
        testo: 'Ogni ricamo è unico, realizzato con cura e passione, per creare capi che raccontano storie e emozioni.'
    },
    {
        id: 3,
        image: 'img7.jpeg',
        testo: 'Dalla nascita al matrimonio, ogni momento della vita è celebrato con i nostri ricami, che diventano parte integrante dei ricordi più preziosi.'
    },
    {
        id: 4,
        image: 'img9.jpeg',
        testo: 'la qualità dei nostri materiali e la passione artigianale sono i valori fondamentali che guidano ogni fase del processo creativo, garantendo capi unici e di alta qualità.'
    },
];
function Chisiamo() {
    const [activedId, setActiveId] = React.useState(null);
    const handleCardClick = (id) => {
        setActiveId(activedId === id ? null : id);
    };
return (
    <section className="homepage-section chi-siamo" id="chi-siamo">
        <h2 className="chi-siamo-title">Ogni punto racconta una storia cucita su misura per te...</h2>
        <p className="testo-hero">Un ricordo o un idea  si trasformano in un ricamo su qualsiasi cosa</p>
        <div className="chi-siamo-grid">
            {cards.map((card) => (
                <div
                    key={card.id}
                    className={`chi-siamo-card ${activedId === card.id ? 'active' : ''}`}
                    onClick={() => handleCardClick(card.id)}
                >
                    <img src={card.image} alt={`Ricamo ${card.id}`} className="chi-siamo-image" />
                    <div className="chi-siamo-overlay">
                        <p className="chi-siamo-testo">{card.testo}</p>
                    </div>
                </div>
    ))}
        </div>
    </section>
);
}
export default Chisiamo;
