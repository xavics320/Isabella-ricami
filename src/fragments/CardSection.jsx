import React, { useState } from 'react';
import './CardSection.css';

const slides = [
  {
    id: 1,
    image: 'img5.jpeg',
    titolo: 'Trasforma i tuoi ricordi',
    testo: 'Ricami personalizzati per conservare i tuoi momenti più preziosi in modo unico e speciale. Ogni punto è un ricordo che dura per sempre.',
  },
  {
    id: 2,
    image: 'img10.jpeg',
    titolo: 'Eleganza per la tua azienda',
    testo: 'Aggiungi un tocco di stile e professionalità con ricami personalizzati per divise, gadget aziendali e molto altro.',
  },
  {
    id: 3,
    image: 'img8.jpeg',
    titolo: 'Il regalo perfetto',
    testo: 'Per ogni occasione — un compleanno, un battesimo, un matrimonio — un ricamo personalizzato è il dono più autentico e indimenticabile.',
  },
];

function CardSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(i => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setCurrent(i => (i === slides.length - 1 ? 0 : i + 1));

  const slide = slides[current];

  return (
    <section className="idee" id="idee">
      <div className="idee-inner">

        {/* Testo sinistra — invertito rispetto a ChiSiamo per varietà */}
        <div className="idee-left">
          <span className="idee-label">Le nostre idee</span>
          <h2 className="idee-titolo">{slide.titolo}</h2>
          <p className="idee-testo">{slide.testo}</p>
          <div className="idee-controls">
            <button className="slide-btn" onClick={prev}>&#8592;</button>
            <span className="slide-counter">{current + 1} / {slides.length}</span>
            <button className="slide-btn" onClick={next}>&#8594;</button>
          </div>
          <div className="idee-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === current ? 'dot--active' : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </div>

        {/* Immagine destra */}
        <div className="idee-right">
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.titolo}
            className="idee-img"
          />
        </div>

      </div>
    </section>
  );
}

export default CardSection;