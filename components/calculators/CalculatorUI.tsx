"use client";
import { useState, useEffect } from "react";
import { Calculator } from "@/lib/calculators/types";
import { calculate, getDefaultValues, formatValue } from "@/lib/calculators/formulaEngine";

type Props = { calculator: Calculator };

// ── Change this to "A" | "B" | "C" to preview each style ──
const PREVIEW_VARIANT: "A" | "B" | "C" = "C";

export default function CalculatorUI({ calculator }: Props) {
  const [values, setValues] = useState<Record<string, number>>(
    getDefaultValues(calculator.inputs)
  );
  const [results, setResults] = useState<Record<string, number>>({});

  useEffect(() => {
    const res = calculate(calculator.formulaType, values);
    setResults(res);
  }, [values, calculator.formulaType]);

  function handleChange(id: string, val: number) {
    setValues(prev => ({ ...prev, [id]: val }));
  }

  if (PREVIEW_VARIANT === "A") return <VariantA calculator={calculator} values={values} results={results} onChange={handleChange} />;
  if (PREVIEW_VARIANT === "B") return <VariantB calculator={calculator} values={values} results={results} onChange={handleChange} />;
  return <VariantC calculator={calculator} values={values} results={results} onChange={handleChange} />;
}

type VProps = {
  calculator: Calculator;
  values: Record<string, number>;
  results: Record<string, number>;
  onChange: (id: string, val: number) => void;
};

// ── Shared slider component ───────────────────────────────────────────
function Slider({ input, value, onChange }: {
  input: Calculator["inputs"][0];
  value: number;
  onChange: (id: string, val: number) => void;
}) {
  const pct = ((value - input.min) / (input.max - input.min)) * 100;
  return (
    <input
      type="range"
      min={input.min}
      max={input.max}
      step={input.step}
      value={value}
      onChange={e => onChange(input.id, parseFloat(e.target.value))}
      className="sf-slider"
      style={{ "--pct": `${pct}%` } as React.CSSProperties}
    />
  );
}

// ── VARIANT A — Clean split card, results on right with big number ────
function VariantA({ calculator, values, results, onChange }: VProps) {
  const highlighted = calculator.outputs.find(o => o.highlight);
  const others = calculator.outputs.filter(o => !o.highlight);
  const total = others.reduce((s, o) => s + (results[o.id] || 0), 0);

  return (
    <div className="va-wrap">
      {/* Left: Inputs */}
      <div className="va-left">
        {calculator.inputs.map(input => {
          const pct = ((values[input.id] - input.min) / (input.max - input.min)) * 100;
          return (
            <div key={input.id} className="va-field">
              <div className="va-field-top">
                <span className="va-field-label">{input.label}</span>
                <div className="va-field-value">
                  {input.prefix && <span className="va-prefix">{input.prefix}</span>}
                  <input
                    type="number"
                    value={values[input.id]}
                    min={input.min}
                    max={input.max}
                    onChange={e => {
                      const v = parseFloat(e.target.value);
                      if (!isNaN(v)) onChange(input.id, Math.min(input.max, Math.max(input.min, v)));
                    }}
                    className="va-num-input"
                  />
                  {input.unit && <span className="va-unit">{input.unit}</span>}
                </div>
              </div>
              <Slider input={input} value={values[input.id]} onChange={onChange} />
              <div className="va-minmax">
                <span>{(["?","Rs","₹"].includes(input.prefix ?? "") ? "₹" : input.prefix) || ""}{input.min.toLocaleString("en-IN")}{input.unit || ""}</span>
                <span>{(["?","Rs","₹"].includes(input.prefix ?? "") ? "₹" : input.prefix) || ""}{input.max.toLocaleString("en-IN")}{input.unit || ""}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right: Results */}
      <div className="va-right">
        {/* Big result */}
        {highlighted && (
          <div className="va-hero-result">
            <div className="va-hero-label">{highlighted.label}</div>
            <div className="va-hero-value">
              {results[highlighted.id] !== undefined
                ? formatValue(results[highlighted.id], highlighted.format)
                : "—"}
            </div>
          </div>
        )}

        {/* Bar chart */}
        {others.length >= 2 && total > 0 && (
          <div className="va-bar-wrap">
            {others.map((o, i) => {
              const v = results[o.id] || 0;
              const pct = total > 0 ? (v / total) * 100 : 0;
              const colors = ["#EEF3FF", "#34D399"];
              return (
                <div key={o.id} className="va-bar-row">
                  <div className="va-bar-meta">
                    <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 3, background: colors[i], display: "inline-block" }} />
                      <span className="va-bar-name">{o.label}</span>
                    </span>
                    <span className="va-bar-val">
                      {results[o.id] !== undefined ? formatValue(results[o.id], o.format) : "—"}
                    </span>
                  </div>
                  <div className="va-bar-track">
                    <div className="va-bar-fill" style={{ width: `${pct}%`, background: colors[i] }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CTA */}
        <a href="https://zerodha.com" target="_blank" rel="noopener noreferrer" className="va-cta">
          Start Investing Free →
        </a>
      </div>

      <style>{`
        .va-wrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 420px;
        }
        .va-left {
          padding: 36px 40px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .va-right {
          padding: 36px 40px;
          background: linear-gradient(160deg, #0B1F4F 0%, #1e3a8a 100%);
          border-radius: 0 20px 20px 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .va-field {}
        .va-field-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }
        .va-field-label {
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
        }
        .va-field-value {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--bg);
          border: 1.5px solid var(--border);
          border-radius: 8px;
          padding: 6px 10px;
        }
        .va-prefix { font-size: 13px; font-weight: 700; color: var(--em); }
        .va-unit   { font-size: 13px; font-weight: 600; color: var(--muted); }
        .va-num-input {
          border: none; outline: none;
          font-size: 14px; font-weight: 700;
          color: var(--navy); background: transparent;
          font-family: inherit; width: 64px; text-align: right;
        }
        .va-minmax {
          display: flex;
          justify-content: space-between;
          margin-top: 7px;
          font-size: 11.5px;
          color: #94A3B8;
        }
        .va-hero-result { margin-bottom: 24px; }
        .va-hero-label {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,.45);
          letter-spacing: .05em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .va-hero-value {
          font-family: var(--font-jakarta);
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 800;
          color: #34D399;
          letter-spacing: -.02em;
          line-height: 1;
        }
        .va-bar-wrap {
          display: flex;
          flex-direction: column;
          gap: 16px;
          flex: 1;
          margin-bottom: 24px;
        }
        .va-bar-row {}
        .va-bar-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 7px;
        }
        .va-bar-name { font-size: 12.5px; color: rgba(255,255,255,.6); font-weight: 500; }
        .va-bar-val  { font-size: 13px; font-weight: 700; color: white; font-family: var(--font-jakarta); }
        .va-bar-track {
          height: 7px;
          background: rgba(255,255,255,.1);
          border-radius: 100px;
          overflow: hidden;
        }
        .va-bar-fill {
          height: 100%;
          border-radius: 100px;
          transition: width .5s cubic-bezier(.4,0,.2,1);
        }
        .va-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 13px;
          border-radius: 10px;
          background: var(--em);
          color: white;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          font-family: var(--font-jakarta);
          transition: all .2s;
        }
        .va-cta:hover { background: var(--em-2); transform: translateY(-1px); }
        @media (max-width: 768px) {
          .va-wrap { grid-template-columns: 1fr; }
          .va-left { padding: 28px 24px; }
          .va-right { padding: 28px 24px; border-radius: 0 0 20px 20px; }
        }
      `}</style>
    </div>
  );
}

// ── VARIANT B — Single column, large result at top, inputs below ──────
function VariantB({ calculator, values, results, onChange }: VProps) {
  const highlighted = calculator.outputs.find(o => o.highlight);
  const others = calculator.outputs.filter(o => !o.highlight);

  return (
    <div className="vb-wrap">

      {/* Result hero — top banner */}
      <div className="vb-hero">
        <div className="vb-hero-inner">
          {others.map((o, i) => (
            <div key={o.id} className="vb-stat">
              <div className="vb-stat-val">
                {results[o.id] !== undefined ? formatValue(results[o.id], o.format) : "—"}
              </div>
              <div className="vb-stat-label">{o.label}</div>
            </div>
          ))}
          {highlighted && (
            <div className="vb-stat vb-stat-main">
              <div className="vb-stat-val vb-stat-val-main">
                {results[highlighted.id] !== undefined
                  ? formatValue(results[highlighted.id], highlighted.format)
                  : "—"}
              </div>
              <div className="vb-stat-label">{highlighted.label}</div>
            </div>
          )}
        </div>
      </div>

      {/* Inputs */}
      <div className="vb-inputs">
        <div className="vb-inputs-grid">
          {calculator.inputs.map(input => (
            <div key={input.id} className="vb-field">
              <div className="vb-field-top">
                <span className="vb-label">{input.label}</span>
                <div className="vb-badge">
                  {input.prefix && <span style={{ color: "var(--em)", fontWeight: 700, fontSize: 13 }}>{input.prefix}</span>}
                  <input
                    type="number"
                    value={values[input.id]}
                    min={input.min}
                    max={input.max}
                    onChange={e => {
                      const v = parseFloat(e.target.value);
                      if (!isNaN(v)) onChange(input.id, Math.min(input.max, Math.max(input.min, v)));
                    }}
                    className="vb-num"
                  />
                  {input.unit && <span style={{ color: "var(--muted)", fontWeight: 600, fontSize: 13 }}>{input.unit}</span>}
                </div>
              </div>
              <Slider input={input} value={values[input.id]} onChange={onChange} />
              <div className="vb-minmax">
                <span>{(["?","Rs","₹"].includes(input.prefix ?? "") ? "₹" : input.prefix) || ""}{input.min.toLocaleString("en-IN")}{input.unit || ""}</span>
                <span>{(["?","Rs","₹"].includes(input.prefix ?? "") ? "₹" : input.prefix) || ""}{input.max.toLocaleString("en-IN")}{input.unit || ""}</span>
              </div>
            </div>
          ))}
        </div>

        <a href="https://zerodha.com" target="_blank" rel="noopener noreferrer" className="vb-cta">
          Start Investing Free →
        </a>
      </div>

      <style>{`
        .vb-wrap {}
        .vb-hero {
          background: linear-gradient(120deg, #0B1F4F 0%, #1A3A8F 50%, #059669 100%);
          padding: 36px 40px;
          border-radius: 20px 20px 0 0;
        }
        .vb-hero-inner {
          display: flex;
          gap: 0;
          flex-wrap: wrap;
        }
        .vb-stat {
          flex: 1;
          min-width: 140px;
          padding: 0 24px;
          border-right: 1px solid rgba(255,255,255,.12);
        }
        .vb-stat:first-child { padding-left: 0; }
        .vb-stat:last-child  { border-right: none; }
        .vb-stat-main { order: -1; }
        .vb-stat-val {
          font-family: var(--font-jakarta);
          font-size: 26px;
          font-weight: 800;
          color: white;
          letter-spacing: -.02em;
          margin-bottom: 5px;
        }
        .vb-stat-val-main {
          font-size: 40px;
          color: #34D399;
        }
        .vb-stat-label {
          font-size: 12px;
          color: rgba(255,255,255,.45);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: .05em;
        }
        .vb-inputs {
          padding: 36px 40px;
        }
        .vb-inputs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px 40px;
          margin-bottom: 32px;
        }
        .vb-field {}
        .vb-field-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .vb-label { font-size: 13.5px; font-weight: 600; color: var(--text); }
        .vb-badge {
          display: flex;
          align-items: center;
          gap: 3px;
          background: var(--nl);
          border: 1.5px solid var(--border);
          border-radius: 8px;
          padding: 5px 10px;
        }
        .vb-num {
          border: none; outline: none;
          font-size: 14px; font-weight: 700;
          color: var(--navy); background: transparent;
          font-family: inherit; width: 60px; text-align: right;
        }
        .vb-minmax {
          display: flex;
          justify-content: space-between;
          margin-top: 7px;
          font-size: 11px;
          color: #94A3B8;
        }
        .vb-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 14px;
          border-radius: 10px;
          background: var(--navy);
          color: white;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          font-family: var(--font-jakarta);
          transition: all .2s;
          max-width: 320px;
          margin: 0 auto;
        }
        .vb-cta:hover { background: var(--navy-2); transform: translateY(-1px); }
        @media (max-width: 768px) {
          .vb-hero { padding: 28px 24px; }
          .vb-inputs { padding: 28px 24px; }
          .vb-inputs-grid { grid-template-columns: 1fr; gap: 24px; }
          .vb-stat { padding: 0 16px; }
        }
      `}</style>
    </div>
  );
}

// ── VARIANT C — Minimal, glassmorphism result card floating right ─────
function VariantC({ calculator, values, results, onChange }: VProps) {
  const highlighted = calculator.outputs.find(o => o.highlight);
  const others = calculator.outputs.filter(o => !o.highlight);
  const totalInvested = results[others[0]?.id] || 0;
  const totalReturns = results[others[1]?.id] || 0;
  const total = totalInvested + totalReturns;
  const investedPct = total > 0 ? (totalInvested / total) * 100 : 50;

  return (
    <div className="vc-wrap">

      {/* Inputs column */}
      <div className="vc-left">
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: ".1em",
          textTransform: "uppercase", color: "var(--em)",
          marginBottom: 32,
        }}>
          {calculator.heading}
        </div>

        {calculator.inputs.map(input => (
          <div key={input.id} className="vc-field">
            <div className="vc-field-row">
              <label className="vc-label">{input.label}</label>
              <div className="vc-pill">
                {input.prefix && <span className="vc-pill-pre">{["?","Rs","₹"].includes(input.prefix) ? "₹" : input.prefix}</span>}
                <input
                  type="number"
                  value={values[input.id]}
                  min={input.min}
                  max={input.max}
                  onChange={e => {
                    const v = parseFloat(e.target.value);
                    if (!isNaN(v)) onChange(input.id, Math.min(input.max, Math.max(input.min, v)));
                  }}
                  className="vc-num"
                />
                {input.unit && <span className="vc-pill-unit">{input.unit}</span>}
              </div>
            </div>
            <Slider input={input} value={values[input.id]} onChange={onChange} />
            <div className="vc-minmax">
              <span>{(["?","Rs","₹"].includes(input.prefix ?? "") ? "₹" : input.prefix) || ""}{input.min.toLocaleString("en-IN")}{input.unit || ""}</span>
            <span>{(["?","Rs","₹"].includes(input.prefix ?? "") ? "₹" : input.prefix) || ""}{input.max.toLocaleString("en-IN")}{input.unit || ""}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Result column */}
      <div className="vc-right">
        {/* Circular progress */}
        <div className="vc-circle-wrap">
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r="70" fill="none" stroke="#EEF3FF" strokeWidth="16" />
            <circle
              cx="90" cy="90" r="70"
              fill="none"
              stroke="#34D399"
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - (100 - investedPct) / 100)}`}
              transform="rotate(-90 90 90)"
              style={{ transition: "stroke-dashoffset .6s cubic-bezier(.4,0,.2,1)" }}
            />
          </svg>
          <div className="vc-circle-inner">
            {highlighted && (
              <>
                <div className="vc-circle-val">
                  {results[highlighted.id] !== undefined
                    ? formatValue(results[highlighted.id], highlighted.format)
                    : "—"}
                </div>
                <div className="vc-circle-label">{highlighted.label}</div>
              </>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="vc-legend">
          {others.map((o, i) => (
            <div key={o.id} className="vc-legend-item">
              <div className="vc-legend-dot" style={{ background: i === 0 ? "#EEF3FF" : "#34D399", border: i === 0 ? "2px solid var(--border)" : "none" }} />
              <div>
                <div className="vc-legend-val">
                  {results[o.id] !== undefined ? formatValue(results[o.id], o.format) : "—"}
                </div>
                <div className="vc-legend-name">{o.label}</div>
              </div>
            </div>
          ))}
        </div>

        <a href="https://zerodha.com" target="_blank" rel="noopener noreferrer" className="vc-cta">
          Start Investing →
        </a>
      </div>

      <style>{`
      .sf-slider {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 5px;
        border-radius: 100px;
        background: linear-gradient(
            to right,
            var(--em) 0%,
            var(--em) var(--pct),
            #E2E8F0 var(--pct),
            #E2E8F0 100%
        );
        outline: none;
        cursor: pointer;
        }
        .sf-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: white;
        border: 2.5px solid var(--em);
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(5,150,105,.25);
        transition: transform .15s;
        }
        .sf-slider::-webkit-slider-thumb:hover { transform: scale(1.15); }
        .sf-slider::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: white;
        border: 2.5px solid var(--em);
        cursor: pointer;
        }
        .vc-wrap {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 0;
        }
        .vc-left {
          padding: 40px 44px;
          border-right: 1px solid var(--border);
        }
        .vc-right {
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          background: var(--bg);
          border-radius: 0 20px 20px 0;
        }
        .vc-field { margin-bottom: 28px; }
        .vc-field-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        .vc-label { font-size: 14px; font-weight: 600; color: var(--text); }
        .vc-pill {
          display: flex;
          align-items: center;
          gap: 3px;
          background: white;
          border: 1.5px solid var(--border);
          border-radius: 8px;
          padding: 6px 10px;
          min-width: 90px;
          justify-content: flex-end;
        }
        .vc-pill-pre  { font-size: 13px; font-weight: 700; color: var(--em); }
        .vc-pill-unit { font-size: 13px; font-weight: 600; color: var(--muted); }
        .vc-num {
          border: none; outline: none;
          font-size: 14px; font-weight: 700;
          color: var(--navy); background: transparent;
          font-family: inherit; width: 60px; text-align: right;
        }
        .vc-minmax {
          display: flex;
          justify-content: space-between;
          margin-top: 7px;
          font-size: 11px;
          color: #94A3B8;
        }
        .vc-circle-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .vc-circle-inner {
          position: absolute;
          text-align: center;
        }
        .vc-circle-val {
          font-family: var(--font-jakarta);
          font-size: 20px;
          font-weight: 800;
          color: var(--navy);
          letter-spacing: -.02em;
          line-height: 1;
          margin-bottom: 4px;
        }
        .vc-circle-label {
          font-size: 11px;
          color: var(--muted);
          font-weight: 500;
        }
        .vc-legend {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
        }
        .vc-legend-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .vc-legend-dot {
          width: 12px;
          height: 12px;
          border-radius: 3px;
          flex-shrink: 0;
        }
        .vc-legend-val {
          font-size: 15px;
          font-weight: 700;
          color: var(--navy);
          font-family: var(--font-jakarta);
        }
        .vc-legend-name {
          font-size: 11.5px;
          color: var(--muted);
          font-weight: 500;
        }
        .vc-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 13px;
          border-radius: 10px;
          background: var(--em);
          color: white;
          text-decoration: none;
          font-size: 14px;
          font-weight: 700;
          font-family: var(--font-jakarta);
          transition: all .2s;
        }
        .vc-cta:hover { background: var(--em-2); transform: translateY(-1px); }
        @media (max-width: 768px) {
          .vc-wrap { grid-template-columns: 1fr; }
          .vc-left { padding: 28px 24px; border-right: none; border-bottom: 1px solid var(--border); }
          .vc-right { padding: 28px 24px; border-radius: 0 0 20px 20px; }
        }
      `}</style>
    </div>
  );
}