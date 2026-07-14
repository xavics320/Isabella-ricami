import { useState, useRef } from "react";
import './Personalizza.css';

// ─── Configurazione WhatsApp ───────────────────────────────────────────────
// Sostituisci con il numero di Isabella (formato internazionale, senza + o spazi)
const WHATSAPP_NUMBER = "39XXXXXXXXXX";

// ─── Dati prodotti ─────────────────────────────────────────────────────────
const PRODOTTI = [
  { id: "maglietta", label: "Maglietta", emoji: "👕", taglie: ["XS","S","M","L","XL","XXL"] },
  { id: "felpa",     label: "Felpa",     emoji: "🧥", taglie: ["XS","S","M","L","XL","XXL"] },
  { id: "cappellino",label: "Cappellino",emoji: "🧢", taglie: ["Unica"] },
  { id: "borsa",     label: "Borsa",     emoji: "👜", taglie: ["Unica"] },
  { id: "grembiule", label: "Grembiule", emoji: "🧑‍🍳", taglie: ["Adulto","Bambino"] },
  { id: "cuscino",   label: "Cuscino",   emoji: "🛋️", taglie: ["40x40","50x50"] },
];

// ─── SVG sagome ────────────────────────────────────────────────────────────
function GarmentSVG({ prodotto }) {
  const shapes = {
    maglietta: (
      <path
        d="M55 22 C50 22 38 25 22 36 L6 58 L28 68 L33 52 L33 132
           C33 135 36 138 40 138 L120 138 C124 138 127 135 127 132
           L127 52 L132 68 L154 58 L138 36 C122 25 110 22 105 22
           C102 30 92 35 80 35 C68 35 58 30 55 22 Z"
        fill="#fdf0f2" stroke="#c47b8a" strokeWidth="1.5"
      />
    ),
    felpa: (
      <>
        <path
          d="M50 20 C45 20 33 23 18 35 L4 58 L26 69 L32 53 L32 140
             C32 143 35 146 39 146 L121 146 C125 146 128 143 128 140
             L128 53 L134 69 L156 58 L142 35 C127 23 115 20 110 20
             C107 29 95 35 80 35 C65 35 53 29 50 20 Z"
          fill="#fdf0f2" stroke="#c47b8a" strokeWidth="1.5"
        />
        <rect x="60" y="142" width="40" height="12" rx="3" fill="#fdf0f2" stroke="#c47b8a" strokeWidth="1.2"/>
      </>
    ),
    cappellino: (
      <>
        <path d="M18 88 Q80 42 142 88 L145 108 Q80 122 15 108 Z"
          fill="#fdf0f2" stroke="#c47b8a" strokeWidth="1.5"/>
        <path d="M48 88 Q80 58 112 88" fill="none" stroke="#c47b8a" strokeWidth="1"/>
        <rect x="62" y="108" width="36" height="10" rx="2" fill="#fdf0f2" stroke="#c47b8a" strokeWidth="1"/>
      </>
    ),
    borsa: (
      <>
        <rect x="38" y="58" width="84" height="82" rx="6"
          fill="#fdf0f2" stroke="#c47b8a" strokeWidth="1.5"/>
        <path d="M55 58 Q55 38 80 38 Q105 38 105 58"
          fill="none" stroke="#c47b8a" strokeWidth="1.5"/>
        <rect x="68" y="88" width="24" height="16" rx="4"
          fill="none" stroke="#c47b8a" strokeWidth="1"/>
      </>
    ),
    grembiule: (
      <>
        <path d="M55 20 L55 40 Q55 50 40 50 L30 50 L30 145 L130 145 L130 50 L120 50 Q105 50 105 40 L105 20 Z"
          fill="#fdf0f2" stroke="#c47b8a" strokeWidth="1.5"/>
        <rect x="66" y="20" width="28" height="20" rx="4"
          fill="#fdf0f2" stroke="#c47b8a" strokeWidth="1"/>
      </>
    ),
    cuscino: (
      <>
        <rect x="22" y="32" width="116" height="96" rx="12"
          fill="#fdf0f2" stroke="#c47b8a" strokeWidth="1.5"/>
        <rect x="30" y="40" width="100" height="80" rx="8"
          fill="none" stroke="#c47b8a" strokeWidth="0.8" strokeDasharray="4 3"/>
      </>
    ),
  };

  // Zona drop (dove va il ricamo) per ogni prodotto
  const zones = {
    maglietta:  { cx: 80, cy: 90, w: 56, h: 50 },
    felpa:      { cx: 80, cy: 95, w: 56, h: 54 },
    cappellino: { cx: 80, cy: 78, w: 44, h: 28 },
    borsa:      { cx: 80, cy: 98, w: 48, h: 44 },
    grembiule:  { cx: 80, cy: 98, w: 52, h: 50 },
    cuscino:    { cx: 80, cy: 80, w: 64, h: 52 },
  };

  const z = zones[prodotto] || zones.maglietta;

  return (
    <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}>
      {shapes[prodotto] || shapes.maglietta}
      {/* zona ricamo tratteggiata */}
      <rect
        x={z.cx - z.w / 2} y={z.cy - z.h / 2}
        width={z.w} height={z.h} rx="4"
        fill="rgba(212,160,172,0.08)"
        stroke="#c47b8a" strokeWidth="0.8" strokeDasharray="3 2"
      />
    </svg>
  );
}

// ─── Componente principale ─────────────────────────────────────────────────
function Personalizza() {
  const [prodotto, setProdotto]   = useState("maglietta");
  const [taglia,   setTaglia]     = useState("M");
  const [note,     setNote]       = useState("");
  const [imgSrc,   setImgSrc]     = useState(null);
  const [imgPos,   setImgPos]     = useState({ x: 50, y: 50 }); // % rispetto al preview
  const [imgSize,  setImgSize]    = useState(80); // px
  const [rotation, setRotation]   = useState(0);
  const [dragging, setDragging]   = useState(false);
  const [dragStart,setDragStart]  = useState({ mx: 0, my: 0, ox: 0, oy: 0 });
  const [step,     setStep]       = useState(1); // 1 prodotto | 2 design | 3 riepilogo
  const [nome,     setNome]       = useState("");
  const fileRef  = useRef();
  const previewRef = useRef();

  const prodDati = PRODOTTI.find(p => p.id === prodotto);

  // Cambio prodotto resetta taglia
  function handleProdotto(id) {
    setProdotto(id);
    const p = PRODOTTI.find(x => x.id === id);
    setTaglia(p.taglie[0]);
  }

  // Upload immagine
  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      setImgSrc(ev.target.result);
      setImgPos({ x: 50, y: 50 });
      setImgSize(80);
      setRotation(0);
    };
    reader.readAsDataURL(file);
  }

  // Drag dell'immagine sul preview
  function onMouseDown(e) {
    e.preventDefault();
    setDragging(true);
    setDragStart({
      mx: e.clientX, my: e.clientY,
      ox: imgPos.x,  oy: imgPos.y,
    });
  }
  function onMouseMove(e) {
    if (!dragging) return;
    const rect = previewRef.current.getBoundingClientRect();
    const dx = ((e.clientX - dragStart.mx) / rect.width)  * 100;
    const dy = ((e.clientY - dragStart.my) / rect.height) * 100;
    setImgPos({
      x: Math.max(5, Math.min(95, dragStart.ox + dx)),
      y: Math.max(5, Math.min(95, dragStart.oy + dy)),
    });
  }
  function onMouseUp() { setDragging(false); }

  // Touch support
  function onTouchStart(e) {
    const t = e.touches[0];
    setDragging(true);
    setDragStart({ mx: t.clientX, my: t.clientY, ox: imgPos.x, oy: imgPos.y });
  }
  function onTouchMove(e) {
    if (!dragging) return;
    const t = e.touches[0];
    const rect = previewRef.current.getBoundingClientRect();
    const dx = ((t.clientX - dragStart.mx) / rect.width)  * 100;
    const dy = ((t.clientY - dragStart.my) / rect.height) * 100;
    setImgPos({
      x: Math.max(5, Math.min(95, dragStart.ox + dx)),
      y: Math.max(5, Math.min(95, dragStart.oy + dy)),
    });
  }

  // Costruzione messaggio WhatsApp
  function inviaWhatsApp() {
    const riga = (label, val) => val ? `• ${label}: ${val}\n` : "";
    const msg =
      `🧵 *Nuova richiesta ricamo — Isabella Ricami*\n\n` +
      riga("Nome", nome) +
      riga("Prodotto", prodDati?.label) +
      riga("Taglia", taglia) +
      riga("Design allegato", imgSrc ? "Sì (vedi foto)" : "No") +
      riga("Note", note || "—") +
      `\nInviato dal sito isabellaricami.it`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <section id="personalizza" className="personalizza-section">
      <div className="personalizza-container">

        {/* Intestazione */}
        <div className="personalizza-header">
          <h2 className="personalizza-title">Crea il tuo ricamo</h2>
          <p className="personalizza-lead">
            Scegli il prodotto, carica il tuo disegno o foto e dicci come lo vuoi.
          </p>
        </div>

        {/* Step indicator */}
        <div className="step-row">
          {["Prodotto", "Design", "Riepilogo"].map((s, i) => (
            <button
              key={s}
              onClick={() => setStep(i + 1)}
              className={`step-btn ${
                step === i + 1 ? "step-btn--active" : step > i + 1 ? "step-btn--done" : ""
              }`}
            >
              <span className="step-num">{i + 1}</span> {s}
            </button>
          ))}
        </div>

        <div className="personalizza-grid">

          {/* ── COLONNA SINISTRA ── */}
          <div className="personalizza-col-left">

            {/* Step 1 — Prodotto */}
            {step === 1 && (
              <>
                <p className="field-label">Che cosa vuoi ricamare?</p>
                <div className="prod-grid">
                  {PRODOTTI.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleProdotto(p.id)}
                      className={`prod-btn ${prodotto === p.id ? "prod-btn--selected" : ""}`}
                    >
                      <span className="prod-emoji">{p.emoji}</span>
                      <span className="prod-label">{p.label}</span>
                    </button>
                  ))}
                </div>

                <p className="field-label">Taglia</p>
                <div className="taglia-row">
                  {prodDati.taglie.map(t => (
                    <button
                      key={t}
                      onClick={() => setTaglia(t)}
                      className={`taglia-btn ${taglia === t ? "taglia-btn--selected" : ""}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <button className="btn-primary" onClick={() => setStep(2)}>
                  Continua →
                </button>
              </>
            )}

            {/* Step 2 — Design */}
            {step === 2 && (
              <>
                <p className="field-label">Carica il tuo disegno o foto</p>
                <div className="upload-area" onClick={() => fileRef.current.click()}>
                  {imgSrc
                    ? <img src={imgSrc} alt="design" className="upload-thumb" />
                    : <>
                        <span className="upload-icon">📎</span>
                        <span className="upload-text">Clicca per caricare</span>
                        <span className="upload-hint">JPG, PNG, GIF — max 10 MB</span>
                      </>
                  }
                </div>
                <input ref={fileRef} type="file" accept="image/*"
                  style={{ display: "none" }} onChange={handleFile} />

                {imgSrc && (
                  <div className="img-controls">
                    <button className="ctrl-btn" onClick={() => setRotation(r => r - 90)}>↺ Ruota</button>
                    <button className="ctrl-btn" onClick={() => setImgSize(s => Math.max(30, s - 10))}>− Rimpiccoli</button>
                    <button className="ctrl-btn" onClick={() => setImgSize(s => Math.min(160, s + 10))}>+ Ingrandisci</button>
                    <button className="ctrl-btn ctrl-btn--danger"
                      onClick={() => { setImgSrc(null); fileRef.current.value = ""; }}>
                      ✕ Rimuovi
                    </button>
                  </div>
                )}

                <p className="field-label field-label--spaced">Note per Isabella</p>
                <textarea
                  className="field-textarea"
                  rows={4}
                  placeholder="Es: colori preferiti, posizione del ricamo, testo da aggiungere, numero di pezzi…"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                />

                <div className="form-nav">
                  <button className="btn-secondary" onClick={() => setStep(1)}>← Indietro</button>
                  <button className="btn-primary" onClick={() => setStep(3)}>Continua →</button>
                </div>
              </>
            )}

            {/* Step 3 — Riepilogo */}
            {step === 3 && (
              <>
                <p className="field-label">I tuoi dati</p>
                <input
                  className="field-input"
                  type="text"
                  placeholder="Il tuo nome (facoltativo)"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                />

                <div className="summary-box">
                  <div className="summary-row">
                    <span className="summary-key">Prodotto</span>
                    <span className="summary-val">{prodDati?.label} — taglia {taglia}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-key">Design</span>
                    <span className="summary-val">{imgSrc ? "✓ Caricato" : "Nessuna immagine"}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-key">Note</span>
                    <span className="summary-val">{note || "—"}</span>
                  </div>
                </div>

                <p className="form-hint">
                  Premendo il bottone si aprirà WhatsApp con il riepilogo già scritto.
                  Isabella ti risponderà con un preventivo personalizzato.
                </p>

                <div className="form-nav">
                  <button className="btn-secondary" onClick={() => setStep(2)}>← Indietro</button>
                  <button className="btn-whatsapp" onClick={inviaWhatsApp}>
                    <span className="btn-whatsapp-icon">💬</span> Richiedi preventivo
                  </button>
                </div>
              </>
            )}
          </div>

          {/* ── COLONNA DESTRA — Anteprima ── */}
          <div className="personalizza-col-right">
            <p className="field-label">Anteprima</p>
            <div
              ref={previewRef}
              className="preview-box"
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchMove={onTouchMove}
              onTouchEnd={onMouseUp}
            >
              <div className="preview-svg">
                <GarmentSVG prodotto={prodotto} />
              </div>

              {imgSrc && (
                <img
                  src={imgSrc}
                  alt="design"
                  draggable={false}
                  onMouseDown={onMouseDown}
                  onTouchStart={onTouchStart}
                  className="preview-drag-img"
                  style={{
                    left: `${imgPos.x}%`,
                    top:  `${imgPos.y}%`,
                    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                    width:  imgSize,
                    height: imgSize,
                    cursor: dragging ? "grabbing" : "grab",
                  }}
                />
              )}

              {!imgSrc && (
                <div className="preview-hint">
                  trascina qui la tua immagine dopo il caricamento
                </div>
              )}
            </div>

            <p className="preview-note">
              💡 Dopo aver caricato l'immagine puoi trascinarla sul prodotto per indicare la posizione del ricamo.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Personalizza;
