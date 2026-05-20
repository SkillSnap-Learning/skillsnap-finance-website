import Image from "next/image";

export default function MacbookSection() {
  return (
    <section style={{
      background: "var(--navy)",
      padding: "72px 0 0",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Dot grid background */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(circle,rgba(255,255,255,.03) 1px,transparent 1px)",
        backgroundSize: "24px 24px",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: ".12em",
            textTransform: "uppercase", color: "rgba(5,150,105,.8)",
            marginBottom: 10,
          }}>
            See it in action
          </div>
          <h2 style={{
            fontFamily: "var(--font-jakarta)",
            fontSize: "clamp(26px,3vw,38px)", fontWeight: 800,
            color: "white", letterSpacing: "-.02em", lineHeight: 1.2,
          }}>
            Finance tools that actually{" "}
            <em style={{ fontStyle: "italic", color: "#34D399" }}>make sense</em>
          </h2>
          <p style={{
            fontSize: 15, color: "rgba(255,255,255,.5)",
            marginTop: 10, maxWidth: 460, marginInline: "auto",
            lineHeight: 1.7,
          }}>
            Our calculators are built for real Indian families — not just finance nerds.
          </p>
        </div>

        {/* MacBook frame */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="mb-outer">

            {/* Lid */}
            <div style={{
              background: "#111",
              borderRadius: "12px 12px 0 0",
              padding: "10px 10px 0",
              border: "1px solid #2a2a2a",
              borderBottom: "none",
            }}>
              {/* Camera notch */}
              <div style={{
                width: 48, height: 4,
                background: "#1e1e1e", borderRadius: 2,
                margin: "0 auto 8px",
              }} />
              {/* Screen */}
              <div style={{
                background: "#0B1F4F",
                borderRadius: "5px 5px 0 0",
                aspectRatio: "16/10",
                overflow: "hidden",
                position: "relative",
                border: "1px solid #1e1e1e",
                borderBottom: "none",
              }}>
                <Image
                  src="/images/sip-calculator.png"
                  alt="SkillSnap Finance calculators"
                  fill
                  style={{ objectFit: "contain", background: "white" }}
                />
              </div>
            </div>

            {/* Hinge */}
            <div style={{
              height: 5,
              background: "linear-gradient(180deg,#1a1a1a,#2a2a2a)",
            }} />

            {/* Base */}
            <div style={{
              background: "#1a1a1a",
              borderRadius: "0 0 10px 10px",
              padding: "10px 10px 7px",
              border: "1px solid #2a2a2a",
              borderTop: "none",
            }}>
              {/* Keyboard */}
              <div style={{
                background: "#111",
                borderRadius: 5,
                height: 54,
                backgroundImage: `
                  repeating-linear-gradient(90deg,#1e1e1e 0,#1e1e1e 1px,transparent 1px,transparent 22px),
                  repeating-linear-gradient(180deg,#1e1e1e 0,#1e1e1e 1px,transparent 1px,transparent 14px)
                `,
                backgroundSize: "22px 14px",
                opacity: 0.55,
              }} />
              {/* Trackpad */}
              <div style={{
                width: 90, height: 32,
                background: "#1a1a1a",
                border: "1px solid #2a2a2a",
                borderRadius: 5,
                margin: "5px auto 0",
              }} />
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .mb-outer {
          width: min(660px, 88vw);
          transform: perspective(1200px) rotateX(6deg);
          transform-origin: bottom center;
          transition: transform .4s ease;
        }
        .mb-outer:hover {
          transform: perspective(1200px) rotateX(1deg);
        }
        @media (max-width: 640px) {
          section { padding-top: 56px !important; }
        }
      `}</style>
    </section>
  );
}