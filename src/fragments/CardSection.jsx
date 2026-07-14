// CardSection.jsx
import React from 'react';
import './CardSection.css';

function CardSection() {
  const cards = [
    {
      id: 1,
      image: 'img5.jpeg',
      title: 'Trasforma i tuoi ricordi in ricami unici',
      descrizione: 'Ricami personalizzati per conservare i tuoi momenti più preziosi in modo unico e speciale.',
    },
    {
      id: 2,
      image: 'img10.jpeg',
      title: 'Dai un tocco di eleganza alla tua azienda',
      descrizione: 'Trasforma il tuo spazio di lavoro con ricami unici che aggiungono stile e sofisticazione.',
    },
    {
      id: 3,
      image: 'img8.jpeg',
      title: 'Idee regalo per ogni occasione',
      descrizione: 'Il regalo perfetto per ogni occasione, con un tocco di personalità e stile.',
    },
  ];

  return (
    <section className="homepage-section idee" id="idee">
        <h2 className="idee-titolo">Diamo forma alle tue idea...</h2>
        <p className="testo-idee">Dobbiamo trovare un testo da inserire.</p>
        <div className="card-section">
          {cards.map((card) => (
            <div className="card" key={card.id}>
              <img src={card.image} alt={card.title} className="card-img" />
              <div className="card-body">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.descrizione}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
  );
}

export default CardSection;
