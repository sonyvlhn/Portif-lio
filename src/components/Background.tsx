export default function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="aurora-blob left-[-10vw] top-[-10vh] h-[55vh] w-[55vh] bg-accent-2"
        style={{ animation: "aurora-a 26s ease-in-out infinite" }}
      />
      <div
        className="aurora-blob right-[-12vw] top-[20vh] h-[50vh] w-[50vh] bg-[#134e4a]"
        style={{ animation: "aurora-b 32s ease-in-out infinite" }}
      />
      <div
        className="aurora-blob bottom-[-20vh] left-[30vw] h-[45vh] w-[45vh] bg-[#7c2d12] !opacity-25"
        style={{ animation: "aurora-c 38s ease-in-out infinite" }}
      />
      <div className="grid-bg absolute inset-0 animate-grid" />
      <div className="noise absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--color-ink)_100%)]" />
    </div>
  );
}
