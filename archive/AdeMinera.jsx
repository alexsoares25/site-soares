import { useState, useEffect, useRef } from "react";

const CONTENT = {
  nav: ["Início", "Gestão Técnica", "Mineração", "Engenharia"],
  conformidades: [
    "Plano de Gerenciamento de Pneus",
    "Concessão do Condutor ou Operador",
    "Laudo de Cronotacógrafo",
    "Laudo Eletromecânico",
    "Laudo Estrutural – Ônibus e Micro-ônibus",
    "Plano de Manutenção",
    "NR13 – Validado em Diversas Mineradoras",
  ],
  tabs: [
    {
      id: "sinalizacao", label: "Sinalização", items: [
        { icon: "🚩", title: "Bandeirola de Sinalização", desc: "Facilita a visibilidade do veículo em áreas operacionais de alta movimentação." },
        { icon: "🔵", title: "Giroleds e Sirene de Ré", desc: "Melhora visibilidade e avisa sobre manobras, aumentando a segurança." },
        { icon: "🔶", title: "Faixas Refletivas", desc: "Maior visibilidade em condições de baixa luminosidade." },
        { icon: "💡", title: "Faróis Auxiliares", desc: "Iluminação adicional para terrenos difíceis de mineração." },
      ]
    },
    {
      id: "protecao", label: "Proteção", items: [
        { icon: "🏗️", title: "ROPS", desc: "Estrutura de proteção contra capotamentos em terreno irregular." },
        { icon: "🛡️", title: "Grades de Proteção", desc: "Protegem vidros em condições adversas de mineração." },
        { icon: "📹", title: "Câmera de Ré", desc: "Visão em manobras em áreas restritas, evitando colisões." },
        { icon: "🧯", title: "Extintores Certificados", desc: "Segurança em emergências operacionais." },
      ]
    },
    {
      id: "identificacao", label: "Identificação", items: [
        { icon: "🏷️", title: "Tagueamento", desc: "Identificação e rastreamento eficientes da frota." },
        { icon: "🎨", title: "Adesivação Técnica", desc: "Personalização conforme exigência de cada contratante." },
        { icon: "📊", title: "Identificação Operacional", desc: "Padronização para auditoria e rastreabilidade em campo." },
      ]
    }
  ],
  servicos: [
    { icon: "🔧", name: "Mecânica Geral" },
    { icon: "🚗", name: "Suspensão" },
    { icon: "🛑", name: "Freios" },
    { icon: "💻", name: "Injeção Eletrônica" },
    { icon: "🔨", name: "Funilaria" },
    { icon: "🚙", name: "Lanternagem" },
    { icon: "✨", name: "Polimento" },
    { icon: "🛢️", name: "Troca de Óleo" },
  ],
  engenharia: [
    { num: "01", title: "Projetos e Desenhos 3D", desc: "Modelagem tridimensional para visualização antecipada e redução de riscos." },
    { num: "02", title: "Levantamento de Riscos", desc: "Análise técnica preventiva de riscos estruturais e operacionais." },
    { num: "03", title: "Regularização de Obras", desc: "Assessoria completa para alvarás, licenças e adequação normativa." },
    { num: "04", title: "Suporte para Credenciamento", desc: "Preparação documental para grandes operações industriais." },
  ],
  diferenciais: [
    { icon: "⚙️", title: "Engenharia Aplicada", desc: "Estrutura técnica para cada operação" },
    { icon: "📋", title: "Conformidade Normativa", desc: "Alinhamento às exigências regulatórias" },
    { icon: "🛡️", title: "Segurança Operacional", desc: "Proteção do operador e do equipamento" },
    { icon: "🗂️", title: "Controle Documental", desc: "Rastreabilidade e organização total" },
  ]
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeUp({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(30px)",
      transition: `opacity 0.7s ${delay}s, transform 0.7s ${delay}s`
    }}>
      {children}
    </div>
  );
}

export default function AdeMinera() {
  const [activeTab, setActiveTab] = useState("sinalizacao");
  const [hoveredDif, setHoveredDif] = useState(null);

  return (
    <div style={{ fontFamily: "'Barlow', 'Segoe UI', sans-serif", color: "#1A2B45", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root { scroll-behavior: smooth; }
        .condensed { font-family: 'Barlow Condensed', sans-serif !important; }
        @keyframes gridMove { from { transform: translate(0,0); } to { transform: translate(60px,60px); } }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(7,29,71,0.97)", backdropFilter: "blur(10px)",
        padding: "0 5%", display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 70, borderBottom: "2px solid rgba(201,146,42,0.4)"
      }}>
        <div className="condensed" style={{ fontSize: "1.4rem", fontWeight: 800, letterSpacing: "0.08em", color: "#fff", textTransform: "uppercase" }}>
          Soares <span style={{ color: "#C9922A" }}>Serviços</span>
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {CONTENT.nav.map(n => (
            <a key={n} href="#" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none", fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>{n}</a>
          ))}
          <a href="#cta" className="condensed" style={{
            background: "#C9922A", color: "#071D47", padding: "0.5rem 1.4rem",
            fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
            textDecoration: "none", fontSize: "0.88rem",
            clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)"
          }}>Orçamento</a>
        </div>
      </nav>

      {/* HERO */}
      <div style={{
        minHeight: "100vh", background: "#071D47", position: "relative",
        display: "flex", alignItems: "center", padding: "100px 5% 60px", overflow: "hidden"
      }}>
        {/* Grid BG */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(201,146,42,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(201,146,42,0.07) 1px, transparent 1px)",
          backgroundSize: "60px 60px", animation: "gridMove 20s linear infinite"
        }} />
        <div style={{ position: "absolute", left: 0, top: 0, width: 6, height: "100%", background: "linear-gradient(to bottom, transparent, #C9922A, transparent)" }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: "linear-gradient(135deg, transparent 40%, rgba(201,146,42,0.08) 100%)" }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 820 }}>
          <div className="condensed" style={{
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(201,146,42,0.12)", border: "1px solid rgba(201,146,42,0.4)",
            color: "#E8B84B", padding: "0.4rem 1rem", fontSize: "0.75rem",
            letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600,
            marginBottom: "1.5rem", clipPath: "polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)"
          }}>
            <span style={{ width: 7, height: 7, background: "#C9922A", borderRadius: "50%", display: "inline-block" }} />
            Especialista em Ambiente Minerador
          </div>

          <h1 className="condensed" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: 900, lineHeight: 0.95, color: "#fff", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: 8 }}>
            Adequação
          </h1>
          <h1 className="condensed" style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", fontWeight: 900, lineHeight: 0.95, color: "#C9922A", textTransform: "uppercase", letterSpacing: "0.02em", marginBottom: "1rem" }}>
            para Mineração
          </h1>
          <div className="condensed" style={{ fontSize: "1.4rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Engenharia · Conformidade · Segurança Operacional
          </div>
          <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.68)", lineHeight: 1.75, maxWidth: 620, marginBottom: "2.5rem" }}>
            Preparamos veículos para operar em ambientes mineradores com total conformidade normativa, segurança operacional e atendimento às exigências das contratantes. Da adequação estrutural à documentação técnica.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a href="#cta" className="condensed" style={{
              background: "#C9922A", color: "#071D47", padding: "1rem 2.5rem",
              fontWeight: 700, fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase",
              textDecoration: "none", clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)"
            }}>Solicitar Orçamento Técnico</a>
            <a href="#conf" className="condensed" style={{
              border: "1.5px solid rgba(255,255,255,0.35)", color: "rgba(255,255,255,0.75)",
              padding: "1rem 2.5rem", fontWeight: 600, fontSize: "1rem",
              letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none",
              clipPath: "polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%)"
            }}>Ver Conformidades</a>
          </div>
          <div style={{ display: "flex", gap: "3rem", marginTop: "4rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            {[["7+", "Documentos Aprovados"], ["100%", "Cobertura Nacional"], ["NR13", "Validado em Mineradoras"]].map(([n, l]) => (
              <div key={n}>
                <div className="condensed" style={{ fontSize: "2.5rem", fontWeight: 900, color: "#C9922A", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POSICIONAMENTO */}
      <section style={{ padding: "100px 5%", background: "#F4F6FA", position: "relative" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: "linear-gradient(to bottom, #C9922A, #0B2E6B)" }} />
        <FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <div className="condensed" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9922A", display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <span style={{ width: 30, height: 2, background: "#C9922A", display: "inline-block" }} />
                Sobre Nós
              </div>
              <h2 className="condensed" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.05, marginBottom: "0.75rem" }}>
                Integração entre<br />Engenharia e Conformidade
              </h2>
              <div style={{ width: 60, height: 4, background: "#C9922A", margin: "1.5rem 0" }} />
              {["A Soares Serviços integra engenharia aplicada, conformidade regulatória e preparação técnica de frotas para operações industriais e mineradoras.",
                "Nossa atuação vai além da instalação de acessórios. Estruturamos o veículo para atender critérios técnicos, normas internas de segurança e exigências específicas de cada contratante.",
                "Trabalhamos com método, padronização e controle, reduzindo riscos de reprovação e garantindo maior segurança jurídica para nossos clientes."
              ].map((p, i) => <p key={i} style={{ fontSize: "1.02rem", lineHeight: 1.8, color: "#4A5E7A", marginBottom: "1.2rem" }}>{p}</p>)}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {CONTENT.diferenciais.map(d => (
                <div key={d.title} style={{
                  background: "#fff", borderLeft: "4px solid #C9922A",
                  border: "1px solid rgba(11,46,107,0.1)", borderLeft: "4px solid #C9922A",
                  padding: "1.2rem 1.5rem"
                }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{d.icon}</div>
                  <div className="condensed" style={{ fontSize: "0.9rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#0B2E6B" }}>{d.title}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* CONFORMIDADE */}
      <section id="conf" style={{ padding: "100px 5%", background: "#071D47", position: "relative", overflow: "hidden" }}>
        <div className="condensed" style={{ position: "absolute", right: "-2%", bottom: "-8%", fontSize: "10rem", fontWeight: 900, color: "rgba(255,255,255,0.025)", pointerEvents: "none", letterSpacing: "0.05em" }}>CONFORMIDADE</div>
        <FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <div>
              <div className="condensed" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#E8B84B", display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <span style={{ width: 30, height: 2, background: "#C9922A", display: "inline-block" }} />
                Aprovação Corporativa
              </div>
              <h2 className="condensed" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.05, color: "#fff", marginBottom: "0.75rem" }}>
                Conformidade<br />Técnica Aprovada
              </h2>
              <div style={{ width: 60, height: 4, background: "#C9922A", margin: "1.5rem 0", opacity: 0.7 }} />
              <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, fontSize: "1rem", marginBottom: "1rem" }}>
                Documentação aprovada em processos de credenciamento junto a grandes operações industriais e mineradoras.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "1.5rem" }}>
                {CONTENT.conformidades.map(c => (
                  <div key={c} style={{ display: "flex", alignItems: "center", gap: "1rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: "4px solid #C9922A", padding: "0.9rem 1.5rem" }}>
                    <div style={{ width: 26, height: 26, minWidth: 26, background: "#C9922A", color: "#071D47", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem", clipPath: "polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%)" }}>✓</div>
                    <span style={{ color: "rgba(255,255,255,0.82)", fontSize: "0.92rem" }}>{c}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(201,146,42,0.07)", border: "2px solid rgba(201,146,42,0.25)", padding: "3rem", textAlign: "center" }}>
              <div className="condensed" style={{ fontSize: "5rem", fontWeight: 900, color: "#C9922A", lineHeight: 1 }}>7+</div>
              <div style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.5rem" }}>Tipos de Documentos<br />Aprovados</div>
              <div style={{ width: 40, height: 2, background: "#C9922A", margin: "2rem auto", opacity: 0.5 }} />
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.88rem", lineHeight: 1.7 }}>
                Aprovação não é consequência.<br />É parte da nossa estrutura operacional.<br /><br />
                Cada processo é conduzido com controle, rastreabilidade e padronização.
              </p>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ADEQUAÇÕES */}
      <section style={{ padding: "100px 5%", background: "#fff" }}>
        <FadeUp>
          <div className="condensed" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9922A", display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ width: 30, height: 2, background: "#C9922A", display: "inline-block" }} />
            Equipamentos & Serviços
          </div>
          <h2 className="condensed" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.05, marginBottom: "2rem" }}>
            Adequações Técnicas de Veículos
          </h2>
          <div style={{ display: "flex", borderBottom: "2px solid rgba(11,46,107,0.1)", marginBottom: 0, gap: 0 }}>
            {CONTENT.tabs.map(t => (
              <button key={t.id} onClick={() => setActiveTab(t.id)} className="condensed" style={{
                padding: "1rem 2rem", border: "none", background: "transparent",
                fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.1em",
                textTransform: "uppercase", cursor: "pointer",
                color: activeTab === t.id ? "#0B2E6B" : "#6B7F9A",
                borderBottom: activeTab === t.id ? "3px solid #C9922A" : "3px solid transparent",
                marginBottom: -2
              }}>{t.label}</button>
            ))}
          </div>
          <div style={{ padding: "3rem 0" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
              {CONTENT.tabs.find(t => t.id === activeTab)?.items.map(item => (
                <div key={item.title} style={{ border: "1px solid rgba(11,46,107,0.1)", padding: "1.8rem", position: "relative", transition: "transform 0.2s, box-shadow 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(11,46,107,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#C9922A" }} />
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{item.icon}</div>
                  <div className="condensed" style={{ fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#0B2E6B", marginBottom: "0.5rem" }}>{item.title}</div>
                  <p style={{ fontSize: "0.88rem", color: "#6B7F9A", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </section>

      {/* SERVIÇOS COMPLEMENTARES */}
      <section style={{ padding: "100px 5%", background: "#F4F6FA" }}>
        <FadeUp>
          <div className="condensed" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9922A", display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <span style={{ width: 30, height: 2, background: "#C9922A", display: "inline-block" }} />
            Suporte Completo
          </div>
          <h2 className="condensed" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 900, textTransform: "uppercase", marginBottom: "3rem" }}>Serviços Complementares</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "1rem" }}>
            {CONTENT.servicos.map(s => (
              <div key={s.name} style={{ background: "#fff", border: "1px solid rgba(11,46,107,0.08)", padding: "1.5rem 1rem", textAlign: "center", transition: "border-color 0.2s, background 0.2s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#C9922A"; e.currentTarget.style.background = "rgba(201,146,42,0.04)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(11,46,107,0.08)"; e.currentTarget.style.background = "#fff"; }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{s.icon}</div>
                <div className="condensed" style={{ fontSize: "0.82rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "#0B2E6B" }}>{s.name}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* ENGENHARIA */}
      <section style={{ padding: "100px 5%", background: "#0B2E6B" }}>
        <FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
            <div>
              <div className="condensed" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#E8B84B", display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <span style={{ width: 30, height: 2, background: "#C9922A", display: "inline-block" }} />
                Área Técnica
              </div>
              <h2 className="condensed" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 900, textTransform: "uppercase", color: "#fff", lineHeight: 1.05, marginBottom: "0.75rem" }}>
                Engenharia e<br />Regularização
              </h2>
              <div style={{ width: 60, height: 4, background: "#C9922A", margin: "1.5rem 0", opacity: 0.6 }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {CONTENT.engenharia.map(e => (
                  <div key={e.num} style={{ display: "flex", gap: "1.25rem", padding: "1.25rem 1.5rem", background: "rgba(255,255,255,0.04)", borderLeft: "4px solid transparent", transition: "all 0.25s" }}
                    onMouseEnter={el => { el.currentTarget.style.background = "rgba(255,255,255,0.08)"; el.currentTarget.style.borderLeftColor = "#C9922A"; }}
                    onMouseLeave={el => { el.currentTarget.style.background = "rgba(255,255,255,0.04)"; el.currentTarget.style.borderLeftColor = "transparent"; }}>
                    <div className="condensed" style={{ fontSize: "1.8rem", fontWeight: 900, color: "rgba(201,146,42,0.3)", lineHeight: 1, minWidth: "2.5rem" }}>{e.num}</div>
                    <div>
                      <div className="condensed" style={{ fontSize: "0.95rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "#fff" }}>{e.title}</div>
                      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", marginTop: "0.25rem", lineHeight: 1.5 }}>{e.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: "rgba(201,146,42,0.06)", border: "1px solid rgba(201,146,42,0.2)", padding: "3rem", textAlign: "center", position: "relative", minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="condensed" style={{ position: "absolute", fontSize: "7rem", fontWeight: 900, color: "rgba(201,146,42,0.12)", letterSpacing: "-0.02em" }}>ENG</div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <p className="condensed" style={{ fontSize: "1.35rem", fontWeight: 700, textTransform: "uppercase", color: "#fff", lineHeight: 1.35, letterSpacing: "0.04em" }}>
                  Engenharia estruturada.<br />Conformidade validada.<br />
                  <span style={{ color: "#C9922A", fontSize: "1.6rem" }}>Segurança garantida.</span>
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* DIFERENCIAL */}
      <section style={{ padding: "100px 5%", background: "#fff" }}>
        <FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {CONTENT.diferenciais.map((d, i) => (
                <div key={d.title} onMouseEnter={() => setHoveredDif(i)} onMouseLeave={() => setHoveredDif(null)} style={{
                  textAlign: "center", padding: "2rem 1.5rem",
                  border: "1px solid rgba(11,46,107,0.1)",
                  background: hoveredDif === i ? "#0B2E6B" : "#fff",
                  transition: "background 0.35s", cursor: "default"
                }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{d.icon}</div>
                  <div className="condensed" style={{ fontSize: "0.95rem", fontWeight: 700, textTransform: "uppercase", color: hoveredDif === i ? "#fff" : "#0B2E6B", transition: "color 0.35s" }}>{d.title}</div>
                  <p style={{ fontSize: "0.82rem", color: hoveredDif === i ? "rgba(255,255,255,0.6)" : "#6B7F9A", marginTop: "0.5rem", transition: "color 0.35s" }}>{d.desc}</p>
                </div>
              ))}
            </div>
            <div>
              <div className="condensed" style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C9922A", display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <span style={{ width: 30, height: 2, background: "#C9922A", display: "inline-block" }} />
                Diferencial Estratégico
              </div>
              <h2 className="condensed" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1.05, marginBottom: "0.75rem" }}>
                Mais do que<br />instalação
              </h2>
              <div style={{ width: 60, height: 4, background: "#C9922A", margin: "1.5rem 0" }} />
              <div style={{ borderLeft: "5px solid #C9922A", paddingLeft: "1.5rem", margin: "1.5rem 0" }}>
                <p className="condensed" style={{ fontSize: "1.3rem", fontWeight: 700, textTransform: "uppercase", color: "#0B2E6B", lineHeight: 1.3, letterSpacing: "0.02em" }}>
                  A Soares Serviços não apenas instala equipamentos — prepara veículos para aprovação e auditoria.
                </p>
              </div>
              <p style={{ fontSize: "1rem", color: "#4A5E7A", lineHeight: 1.8 }}>
                Nossa estrutura integra engenharia, conformidade normativa, segurança operacional e controle documental. Essa integração reduz riscos, evita paralisações e fortalece a operação do cliente em ambiente minerador.
              </p>
              <p style={{ fontSize: "0.92rem", color: "#6B7F9A", marginTop: "1rem", fontStyle: "italic" }}>Aprovação não é consequência. É padrão.</p>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* CTA FINAL */}
      <section id="cta" style={{ background: "#C9922A", padding: "100px 5%", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(7,29,71,0.12) 0%, transparent 60%)" }} />
        <FadeUp>
          <h2 className="condensed" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, textTransform: "uppercase", color: "#071D47", lineHeight: 1.05, position: "relative", zIndex: 1 }}>
            Prepare Sua Frota<br />para Operar em Mineração
          </h2>
          <p style={{ fontSize: "1.1rem", color: "rgba(7,29,71,0.72)", margin: "1.5rem auto", maxWidth: 600, lineHeight: 1.7, position: "relative", zIndex: 1 }}>
            Solicite um orçamento técnico especializado e tenha seu veículo pronto para inspeção e liberação com total segurança.
          </p>
          <a href="https://wa.me/55" className="condensed" style={{
            display: "inline-block", background: "#071D47", color: "#fff",
            padding: "1.2rem 3rem", fontWeight: 700, fontSize: "1.1rem",
            letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
            clipPath: "polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%)",
            position: "relative", zIndex: 1
          }}>Solicitar Orçamento Agora</a>
          <div style={{ display: "flex", gap: "3rem", justifyContent: "center", marginTop: "3rem", flexWrap: "wrap", position: "relative", zIndex: 1 }}>
            {[["WhatsApp", "(XX) XXXXX-XXXX"], ["E-mail", "contato@soaresservicos.com.br"], ["Site", "soaresservicos.com.br"]].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontSize: "0.78rem", color: "rgba(7,29,71,0.55)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{l}</div>
                <a href="#" className="condensed" style={{ fontSize: "1.1rem", fontWeight: 700, color: "#071D47", textDecoration: "none" }}>{v}</a>
              </div>
            ))}
          </div>
        </FadeUp>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#071D47", padding: "1.5rem 5%", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(201,146,42,0.2)", flexWrap: "wrap", gap: "1rem" }}>
        <div className="condensed" style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Soares <span style={{ color: "#C9922A" }}>Serviços</span> Consultoria e Locação
        </div>
        <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.3)" }}>© 2025 Soares Serviços. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
