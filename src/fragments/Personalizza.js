import { useState, useRef } from "react";

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
    const rect = previewRef.current.getBoundingClientRect();
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
    const rect = previewRef.current.getBoundingClientRect();
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
    <section id="personalizza" style={styles.section}>
      <div style={styles.container}>

        {/* Intestazione */}
        <div style={styles.header}>
          <h2 style={styles.h2}>Crea il tuo ricamo</h2>
          <p style={styles.lead}>
            Scegli il prodotto, carica il tuo disegno o foto e dicci come lo vuoi.
          </p>
        </div>

        {/* Step indicator */}
        <div style={styles.steps}>
          {["Prodotto", "Design", "Riepilogo"].map((s, i) => (
            <button
              key={s}
              onClick={() => setStep(i + 1)}
              style={{
                ...styles.stepBtn,
                ...(step === i + 1 ? styles.stepActive : {}),
                ...(step > i + 1  ? styles.stepDone  : {}),
              }}
            >
              <span style={styles.stepNum}>{i + 1}</span> {s}
            </button>
          ))}
        </div>

        <div style={styles.grid}>

          {/* ── COLONNA SINISTRA ── */}
          <div style={styles.left}>

            {/* Step 1 — Prodotto */}
            {step === 1 && (
              <>
                <p style={styles.label}>Che cosa vuoi ricamare?</p>
                <div style={styles.prodGrid}>
                  {PRODOTTI.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleProdotto(p.id)}
                      style={{
                        ...styles.prodBtn,
                        ...(prodotto === p.id ? styles.prodBtnSel : {}),
                      }}
                    >
                      <span style={styles.prodEmoji}>{p.emoji}</span>
                      <span style={styles.prodLabel}>{p.label}</span>
                    </button>
                  ))}
                </div>

                <p style={styles.label}>Taglia</p>
                <div style={styles.taglie}>
                  {prodDati.taglie.map(t => (
                    <button
                      key={t}
                      onClick={() => setTaglia(t)}
                      style={{
                        ...styles.tagliaBtn,
                        ...(taglia === t ? styles.tagliaBtnSel : {}),
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <button style={styles.nextBtn} onClick={() => setStep(2)}>
                  Continua →
                </button>
              </>
            )}

            {/* Step 2 — Design */}
            {step === 2 && (
              <>
                <p style={styles.label}>Carica il tuo disegno o foto</p>
                <div style={styles.uploadArea} onClick={() => fileRef.current.click()}>
                  {imgSrc
                    ? <img src={imgSrc} alt="design" style={styles.thumbImg} />
                    : <>
                        <span style={styles.uploadIcon}>📎</span>
                        <span style={styles.uploadText}>Clicca per caricare</span>
                        <span style={styles.uploadHint}>JPG, PNG, GIF — max 10 MB</span>
                      </>
                  }
                </div>
                <input ref={fileRef} type="file" accept="image/*"
                  style={{ display: "none" }} onChange={handleFile} />

                {imgSrc && (
                  <div style={styles.imgControls}>
                    <button style={styles.ctrlBtn} onClick={() => setRotation(r => r - 90)}>↺ Ruota</button>
                    <button style={styles.ctrlBtn} onClick={() => setImgSize(s => Math.max(30, s - 10))}>− Rimpiccoli</button>
                    <button style={styles.ctrlBtn} onClick={() => setImgSize(s => Math.min(160, s + 10))}>+ Ingrandisci</button>
                    <button style={{ ...styles.ctrlBtn, ...styles.ctrlDanger }}
                      onClick={() => { setImgSrc(null); fileRef.current.value = ""; }}>
                      ✕ Rimuovi
                    </button>
                  </div>
                )}

                <p style={{ ...styles.label, marginTop: "1.5rem" }}>Note per Isabella</p>
                <textarea
                  style={styles.textarea}
                  rows={4}
                  placeholder="Es: colori preferiti, posizione del ricamo, testo da aggiungere, numero di pezzi…"
                  value={note}
                  onChange={e => setNote(e.target.value)}
                />

                <div style={styles.navRow}>
                  <button style={styles.backBtn} onClick={() => setStep(1)}>← Indietro</button>
                  <button style={styles.nextBtn} onClick={() => setStep(3)}>Continua →</button>
                </div>
              </>
            )}

            {/* Step 3 — Riepilogo */}
            {step === 3 && (
              <>
                <p style={styles.label}>I tuoi dati</p>
                <input
                  style={styles.input}
                  type="text"
                  placeholder="Il tuo nome (facoltativo)"
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                />

                <div style={styles.riepilogo}>
                  <div style={styles.riepilogoRow}>
                    <span style={styles.riepilogoKey}>Prodotto</span>
                    <span style={styles.riepilogoVal}>{prodDati?.label} — taglia {taglia}</span>
                  </div>
                  <div style={styles.riepilogoRow}>
                    <span style={styles.riepilogoKey}>Design</span>
                    <span style={styles.riepilogoVal}>{imgSrc ? "✓ Caricato" : "Nessuna immagine"}</span>
                  </div>
                  <div style={styles.riepilogoRow}>
                    <span style={styles.riepilogoKey}>Note</span>
                    <span style={styles.riepilogoVal}>{note || "—"}</span>
                  </div>
                </div>

                <p style={styles.hint}>
                  Premendo il bottone si aprirà WhatsApp con il riepilogo già scritto.
                  Isabella ti risponderà con un preventivo personalizzato.
                </p>

                <div style={styles.navRow}>
                  <button style={styles.backBtn} onClick={() => setStep(2)}>← Indietro</button>
                  <button style={styles.waBtn} onClick={inviaWhatsApp}>
                    <span style={styles.waIcon}>💬</span> Richiedi preventivo
                  </button>
                </div>
              </>
            )}
          </div>

          {/* ── COLONNA DESTRA — Anteprima ── */}
          <div style={styles.right}>
            <p style={styles.label}>Anteprima</p>
            <div
              ref={previewRef}
              style={styles.preview}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchMove={onTouchMove}
              onTouchEnd={onMouseUp}
            >
              <div style={styles.previewSvg}>
                <GarmentSVG prodotto={prodotto} />
              </div>

              {imgSrc && (
                <img
                  src={imgSrc}
                  alt="design"
                  draggable={false}
                  onMouseDown={onMouseDown}
                  onTouchStart={onTouchStart}
                  style={{
                    position: "absolute",
                    left: `${imgPos.x}%`,
                    top:  `${imgPos.y}%`,
                    transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                    width:  imgSize,
                    height: imgSize,
                    objectFit: "cover",
                    borderRadius: "6px",
                    border: "1.5px solid #c47b8a",
                    cursor: dragging ? "grabbing" : "grab",
                    userSelect: "none",
                    boxShadow: "0 2px 8px rgba(196,123,138,0.25)",
                  }}
                />
              )}

              {!imgSrc && (
                <div style={styles.previewHint}>
                  trascina qui la tua immagine dopo il caricamento
                </div>
              )}
            </div>

            <p style={styles.previewNote}>
              💡 Dopo aver caricato l'immagine puoi trascinarla sul prodotto per indicare la posizione del ricamo.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Personalizza;
// ─── Stili ─────────────────────────────────────────────────────────────────
const ROSA      = "#c47b8a";
const ROSA_LIGHT= "#fdf0f2";
const ROSA_MID  = "#e8b4bf";

const styles = {
  section: {
    background: "#fdf8f5",
    padding: "5rem 1.5rem",
    minHeight: "100vh",
  },
  container: {
    maxWidth: "960px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center",
    marginBottom: "2.5rem",
  },
  h2: {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: "clamp(2rem, 5vw, 3rem)",
    fontWeight: 400,
    color: "#3a2a2e",
    marginBottom: "0.5rem",
  },
  lead: {
    fontSize: "1rem",
    color: "#7a6068",
    fontStyle: "italic",
  },

  // Step bar
  steps: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "2.5rem",
    justifyContent: "center",
  },
  stepBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 18px",
    borderRadius: "999px",
    border: `1px solid ${ROSA_MID}`,
    background: "transparent",
    color: "#9a7880",
    fontSize: "13px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  stepActive: {
    background: ROSA,
    color: "#fff",
    border: `1px solid ${ROSA}`,
    fontWeight: 500,
  },
  stepDone: {
    background: ROSA_LIGHT,
    color: ROSA,
    border: `1px solid ${ROSA_MID}`,
  },
  stepNum: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.3)",
    fontSize: "11px",
  },

  // Layout
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
    alignItems: "start",
  },
  left:  { display: "flex", flexDirection: "column", gap: "0" },
  right: { display: "flex", flexDirection: "column" },

  label: {
    fontSize: "11px",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#9a7880",
    marginBottom: "10px",
    marginTop: "0",
  },

  // Prodotti
  prodGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px",
    marginBottom: "1.5rem",
  },
  prodBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    padding: "12px 8px",
    border: "1px solid #e8dde0",
    borderRadius: "12px",
    background: "#fff",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  prodBtnSel: {
    border: `1.5px solid ${ROSA}`,
    background: ROSA_LIGHT,
    boxShadow: `0 0 0 3px rgba(196,123,138,0.12)`,
  },
  prodEmoji: { fontSize: "26px" },
  prodLabel: { fontSize: "11px", color: "#7a6068" },

  // Taglie
  taglie: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginBottom: "1.5rem",
  },
  tagliaBtn: {
    padding: "6px 16px",
    borderRadius: "999px",
    border: "1px solid #e8dde0",
    background: "#fff",
    fontSize: "12px",
    color: "#7a6068",
    cursor: "pointer",
  },
  tagliaBtnSel: {
    background: ROSA,
    color: "#fff",
    border: `1px solid ${ROSA}`,
  },

  // Upload
  uploadArea: {
    border: `1.5px dashed ${ROSA_MID}`,
    borderRadius: "12px",
    background: ROSA_LIGHT,
    minHeight: "110px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    padding: "1rem",
    marginBottom: "0.75rem",
    gap: "4px",
    transition: "background 0.15s",
  },
  uploadIcon: { fontSize: "28px" },
  uploadText: { fontSize: "13px", color: ROSA, fontWeight: 500 },
  uploadHint: { fontSize: "11px", color: "#b09098" },
  thumbImg: {
    maxHeight: "80px",
    maxWidth: "100%",
    borderRadius: "8px",
    objectFit: "contain",
  },

  // Controlli immagine
  imgControls: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginBottom: "0.5rem",
  },
  ctrlBtn: {
    padding: "5px 12px",
    border: "1px solid #e8dde0",
    borderRadius: "999px",
    background: "#fff",
    fontSize: "12px",
    color: "#5a4048",
    cursor: "pointer",
  },
  ctrlDanger: {
    color: "#c44",
    borderColor: "#f5c6cb",
  },

  // Textarea & Input
  textarea: {
    width: "100%",
    border: "1px solid #e8dde0",
    borderRadius: "10px",
    padding: "10px 12px",
    fontSize: "13px",
    color: "#3a2a2e",
    background: "#fff",
    fontFamily: "inherit",
    resize: "vertical",
    outline: "none",
    lineHeight: 1.6,
    marginBottom: "1.5rem",
    boxSizing: "border-box",
  },
  input: {
    width: "100%",
    border: "1px solid #e8dde0",
    borderRadius: "10px",
    padding: "10px 12px",
    fontSize: "13px",
    color: "#3a2a2e",
    background: "#fff",
    fontFamily: "inherit",
    outline: "none",
    marginBottom: "1rem",
    boxSizing: "border-box",
  },

  // Riepilogo
  riepilogo: {
    border: "1px solid #e8dde0",
    borderRadius: "12px",
    overflow: "hidden",
    marginBottom: "1rem",
  },
  riepilogoRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 14px",
    borderBottom: "1px solid #f2ece8",
    fontSize: "13px",
  },
  riepilogoKey: { color: "#9a7880", fontWeight: 500 },
  riepilogoVal: { color: "#3a2a2e", textAlign: "right", maxWidth: "60%" },

  hint: {
    fontSize: "12px",
    color: "#b09098",
    fontStyle: "italic",
    marginBottom: "1.5rem",
    lineHeight: 1.6,
  },

  // Nav bottoni
  navRow: {
    display: "flex",
    gap: "10px",
    justifyContent: "space-between",
  },
  nextBtn: {
    padding: "11px 28px",
    background: ROSA,
    color: "#fff",
    border: "none",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    flex: 1,
  },
  backBtn: {
    padding: "11px 20px",
    background: "transparent",
    color: ROSA,
    border: `1px solid ${ROSA_MID}`,
    borderRadius: "999px",
    fontSize: "14px",
    cursor: "pointer",
  },
  waBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    background: "#25D366",
    color: "#fff",
    border: "none",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
    flex: 1,
    justifyContent: "center",
  },
  waIcon: { fontSize: "18px" },

  // Preview
  preview: {
    position: "relative",
    background: "#fff",
    border: "1px solid #e8dde0",
    borderRadius: "16px",
    overflow: "hidden",
    aspectRatio: "1",
    userSelect: "none",
  },
  previewSvg: {
    position: "absolute",
    inset: 0,
    padding: "12px",
  },
  previewHint: {
    position: "absolute",
    bottom: "12px",
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: "11px",
    color: "#c8a8b0",
    fontStyle: "italic",
  },
  previewNote: {
    marginTop: "10px",
    fontSize: "11px",
    color: "#b09098",
    lineHeight: 1.6,
  },
};
