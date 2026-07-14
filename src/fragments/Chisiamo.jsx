import React, { useState } from "react";
import './Chisiamo.css';

const slides = [
  {
    id: 1,
    image: 'im4.jpeg',
    titolo: 'La nostra storia',
    testo: 'Isabella nasce come piccola realtà artigianale, con una grande passione per il ricamo e la creazione di capi unici. Offrendo capi che raccontano storie e emozioni attraverso il ricamo.',
  },
  {
    id: 2,
    image: 'img5.jpeg',
    titolo: 'Ogni pezzo è unico',
    testo: 'Ogni ricamo è realizzato con cura e passione, per creare capi che raccontano storie ed emozioni. Nessun pezzo è uguale all\'altro.',
  },
  {
    id: 3,
    image: 'img7.jpeg',
    titolo: 'Per ogni momento della vita',
    testo: 'Dalla nascita al matrimonio, ogni momento della vita è celebrato con i nostri ricami, che diventano parte integrante dei ricordi più preziosi.',
  },
  {
    id: 4,
    image: 'img9.jpeg',
    titolo: 'Qualità artigianale',
    testo: 'La qualità dei materiali e la passione artigianale sono i valori fondamentali che guidano ogni fase del processo creativo, garantendo capi unici e di alta qualità.',
  },
];

function Chisiamo() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(i => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setCurrent(i => (i === slides.length - 1 ? 0 : i + 1));

  const slide = slides[current];

  return (
    <section className="chi-siamo" id="chi-siamo">
      <div className="chi-siamo-inner">

        {/* Immagine sinistra */}
        <div className="chi-siamo-left">
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.titolo}
            className="chi-siamo-img"
          />
          <div className="chi-siamo-controls">
            <button className="slide-btn" onClick={prev}>&#8592;</button>
            <span className="slide-counter">{current + 1} / {slides.length}</span>
            <button className="slide-btn" onClick={next}>&#8594;</button>
          </div>
        </div>

        {/* Testo destra */}
        <div className="chi-siamo-right">
          <span className="chi-siamo-label">Chi siamo</span>
          <h2 className="chi-siamo-titolo">{slide.titolo}</h2>
          <p className="chi-siamo-testo">{slide.testo}</p>
          {/* Pallini indicatori */}
          <div className="chi-siamo-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`dot ${i === current ? 'dot--active' : ''}`}
                onClick={() => setCurrent(i)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default Chisiamo;
