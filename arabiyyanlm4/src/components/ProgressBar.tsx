export function ProgressBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div className="h-[3px] w-full rounded-full" style={{ background: "var(--hairline)" }}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, background: "var(--emerald)" }}
      />
    </div>
  );
}
