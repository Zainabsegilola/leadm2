"use client";

interface DueForecastChartProps {
  labels: string[];
  values: number[];
}

const WIDTH = 320;
const HEIGHT = 96;
const PAD_X = 12;
const PAD_TOP = 12;
const PAD_BOTTOM = 20;

export function DueForecastChart({ labels, values }: DueForecastChartProps) {
  const max = Math.max(1, ...values); // avoid divide-by-zero when everything is 0
  const innerW = WIDTH - PAD_X * 2;
  const innerH = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const stepX = values.length > 1 ? innerW / (values.length - 1) : 0;

  const points = values.map((v, i) => {
    const x = PAD_X + i * stepX;
    const y = PAD_TOP + innerH - (v / max) * innerH;
    return { x, y, v };
  });

  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      width="100%"
      height={HEIGHT}
      role="img"
      aria-label="Number of sentences due for review on each upcoming day"
    >
      {/* Baseline (zero line) */}
      <line
        x1={PAD_X}
        y1={PAD_TOP + innerH}
        x2={WIDTH - PAD_X}
        y2={PAD_TOP + innerH}
        stroke="var(--hairline)"
        strokeWidth="1"
      />

      <path d={path} fill="none" stroke="var(--emerald)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.v > 0 ? 3 : 2} fill={p.v > 0 ? "var(--emerald-glow)" : "var(--hairline)"} />
      ))}

      {labels.map((label, i) => (
        <text
          key={label + i}
          x={PAD_X + i * stepX}
          y={HEIGHT - 4}
          textAnchor="middle"
          fontSize="9"
          fill="var(--muted-dim)"
        >
          {label}
        </text>
      ))}
    </svg>
  );
}
