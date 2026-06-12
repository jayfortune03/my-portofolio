export function SocialPreviewImage() {
  const tags = ["Full Stack", "Frontend", "Backend", "TypeScript", "React", "Next.js", "NestJS", "PostgreSQL"];

  return (
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#07100d",
        backgroundImage:
          "linear-gradient(rgba(126, 247, 185, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(126, 247, 185, 0.07) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        color: "#edf7f1",
        fontFamily: "Arial, Helvetica, sans-serif",
        padding: "64px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ color: "#7ef7b9", fontSize: 26, fontWeight: 800, letterSpacing: 1 }}>NF.dev</div>
        <div
          style={{
            border: "1px solid rgba(126, 247, 185, 0.42)",
            borderRadius: 10,
            color: "#7ef7b9",
            fontSize: 24,
            fontWeight: 700,
            padding: "12px 18px",
          }}
        >
          available_for(work)
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
        <div style={{ color: "#7ef7b9", fontSize: 28, fontWeight: 700 }}>
          Full Stack | Frontend | Backend Engineer
        </div>
        <div style={{ maxWidth: 880, fontSize: 82, fontWeight: 900, letterSpacing: -2, lineHeight: 0.95 }}>
          Nicholas Fortune builds scalable product systems.
        </div>
        <div style={{ maxWidth: 880, color: "rgba(237, 247, 241, 0.74)", fontSize: 30, lineHeight: 1.35 }}>
          CRM platforms, backend APIs, web apps, mobile workflows, and real-time operational systems.
        </div>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
        {tags.map((tag) => (
          <div
            key={tag}
            style={{
              border: "1px solid rgba(126, 247, 185, 0.24)",
              borderRadius: 8,
              background: "rgba(126, 247, 185, 0.1)",
              color: "#edf7f1",
              fontSize: 22,
              fontWeight: 700,
              padding: "11px 16px",
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}
