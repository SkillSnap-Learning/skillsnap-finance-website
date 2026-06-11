"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [resendDisabled, setResendDisabled] = useState(false);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Reset on close
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep("phone");
        setPhone("");
        setOtp(["", "", "", ""]);
      }, 300);
    }
  }, [open]);

  function handlePhone(val: string) {
    setPhone(val.replace(/\D/g, "").slice(0, 10));
  }

  function sendOTP() {
    if (phone.length !== 10) return;
    setStep("otp");
    setOtp(["", "", "", ""]);
    setTimeout(() => document.getElementById("otp-0")?.focus(), 100);
  }

  function handleOtp(i: number, val: string) {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = digit;
    setOtp(next);
    if (digit && i < 3) document.getElementById(`otp-${i + 1}`)?.focus();
  }

  function handleOtpBack(e: React.KeyboardEvent, i: number) {
    if (e.key === "Backspace" && !otp[i] && i > 0)
      document.getElementById(`otp-${i - 1}`)?.focus();
  }

  function verifyOTP() {
    if (otp.join("").length !== 4) return;
    // TODO: wire to backend
    alert("OTP verified! Redirecting...");
    onClose();
  }

  function resendOTP() {
    setOtp(["", "", "", ""]);
    setResendDisabled(true);
    document.getElementById("otp-0")?.focus();
    setTimeout(() => setResendDisabled(false), 30000);
  }

  if (!open) return null;

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(11,31,79,.55)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24,
      }}
    >
      <div className="modal-box" style={{ position: "relative" }}>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 16, right: 16,
            width: 32, height: 32, borderRadius: "50%",
            background: "var(--bg)", border: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "var(--muted)", zIndex: 2,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Left panel */}
        <div className="modal-left-panel">
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ marginBottom: 28 }}>
              <div style={{
                width: 100, height: 100, borderRadius: 14,
                background: "white", padding: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Image
                  src="/images/skillsnap-logo.svg"
                  alt="SkillSnap Finance"
                  width={156} height={80}
                  style={{ objectFit: "contain", width: 84, height: "auto" }}
                />
              </div>
            </div>
            <div style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: 26, fontWeight: 800,
              color: "white", lineHeight: 1.25,
              letterSpacing: "-.025em", marginBottom: 12,
            }}>
              Smart money,<br />
              <em style={{ fontStyle: "italic", color: "#34D399" }}>plain language.</em>
            </div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.65 }}>
              Join thousands of Indian families making better financial decisions every day.
            </div>
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            {[
              "Free forever — no hidden charges",
              "No spam, ever",
              "Your data stays private",
            ].map((text, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 9,
                fontSize: 12.5, color: "rgba(255,255,255,.7)",
                fontWeight: 500, marginBottom: i < 2 ? 10 : 0,
              }}>
                <div style={{
                  width: 18, height: 18, borderRadius: "50%",
                  background: "rgba(5,150,105,.25)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#34D399" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div style={{ flex: 1, padding: "40px 36px", display: "flex", flexDirection: "column", overflowY: "auto" }}>

          {step === "phone" ? (
            <>
              <div style={{ fontFamily: "var(--font-jakarta)", fontSize: 24, fontWeight: 800, color: "var(--text)", letterSpacing: "-.02em", marginBottom: 6 }}>
                Welcome back
              </div>
              <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 32, lineHeight: 1.5 }}>
                Enter your mobile number to continue
              </div>

              {/* Phone input */}
              <div className="phone-input-wrap">
                <div style={{
                  padding: "0 14px",
                  borderRight: "1.5px solid var(--border)",
                  fontSize: 14, fontWeight: 600, color: "var(--muted)",
                  background: "var(--bg)", height: 48,
                  display: "flex", alignItems: "center", gap: 6,
                  flexShrink: 0, whiteSpace: "nowrap",
                }}>
                  🇮🇳 +91
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => handlePhone(e.target.value)}
                  placeholder="Enter 10-digit mobile number"
                  autoFocus
                  style={{
                    flex: 1, height: 48, padding: "0 16px",
                    border: "none", outline: "none",
                    fontSize: 15, fontFamily: "inherit",
                    color: "var(--text)", background: "white",
                    letterSpacing: ".04em",
                  }}
                />
              </div>

              <button
                onClick={sendOTP}
                disabled={phone.length !== 10}
                className="modal-submit-btn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Send OTP
              </button>

              <div style={{ fontSize: 11.5, color: "#94A3B8", textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
                By continuing, you agree to our{" "}
                <Link href="/terms" style={{ color: "var(--navy-2)", textDecoration: "none" }}>Terms of Use</Link>
                {" "}& <Link href="/privacy" style={{ color: "var(--navy-2)", textDecoration: "none" }}>Privacy Policy</Link>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep("phone")}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  fontSize: 13, fontWeight: 600, color: "var(--muted)",
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "inherit", marginBottom: 24, padding: 0,
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 5l-7 7 7 7"/>
                </svg>
                Back
              </button>

              <div style={{ fontFamily: "var(--font-jakarta)", fontSize: 24, fontWeight: 800, color: "var(--text)", letterSpacing: "-.02em", marginBottom: 6 }}>
                Enter OTP
              </div>
              <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 8, lineHeight: 1.5 }}>
                We&apos;ve sent a 4-digit OTP to
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 24 }}>
                <strong style={{ color: "var(--text)" }}>+91 {phone.slice(0, 5)}XXXXX</strong>
              </div>

              {/* OTP boxes */}
              <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="tel"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtp(i, e.target.value)}
                    onKeyDown={e => handleOtpBack(e, i)}
                    style={{
                      flex: 1, height: 52,
                      border: "1.5px solid var(--border)", borderRadius: 10,
                      textAlign: "center", fontSize: 20, fontWeight: 700,
                      color: "var(--navy)", fontFamily: "monospace",
                      outline: "none", background: "var(--bg)",
                      transition: "all .2s",
                    }}
                    onFocus={e => { e.target.style.borderColor = "var(--navy-2)"; e.target.style.background = "white"; }}
                    onBlur={e  => { e.target.style.borderColor = "var(--border)"; e.target.style.background = "var(--bg)"; }}
                  />
                ))}
              </div>

              <button onClick={verifyOTP} className="modal-submit-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                Verify & Login
              </button>

              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 12 }}>
                Didn&apos;t receive OTP?{" "}
                <button
                  onClick={resendOTP}
                  disabled={resendDisabled}
                  style={{
                    background: "none", border: "none", cursor: resendDisabled ? "not-allowed" : "pointer",
                    fontSize: 13, fontWeight: 600,
                    color: resendDisabled ? "var(--muted)" : "var(--navy-2)",
                    fontFamily: "inherit", padding: 0,
                  }}
                >
                  {resendDisabled ? "Sent!" : "Resend OTP"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        .modal-box {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          width: min(820px, 100%);
          max-height: 90vh;
          box-shadow: 0 24px 80px rgba(11,31,79,.25);
          animation: modalIn .25s ease both;
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(.96) translateY(12px); }
          to   { opacity: 1; transform: scale(1)   translateY(0); }
        }
        .modal-left-panel {
          width: 300px; flex-shrink: 0;
          background: linear-gradient(145deg,var(--navy) 0%,var(--navy-2) 60%,#2D5BE3 100%);
          padding: 40px 32px;
          display: flex; flex-direction: column; justify-content: space-between;
          position: relative; overflow: hidden;
        }
        .modal-left-panel::before {
          content: '';
          position: absolute; inset: 0;
          background-image: radial-gradient(circle,rgba(255,255,255,.05) 1px,transparent 1px);
          background-size: 18px 18px; pointer-events: none;
        }
        .modal-left-panel::after {
          content: '';
          position: absolute; bottom: -60px; right: -60px;
          width: 200px; height: 200px; border-radius: 50%;
          border: 40px solid rgba(255,255,255,.05); pointer-events: none;
        }
        .phone-input-wrap {
          display: flex; align-items: center;
          border: 1.5px solid var(--border); border-radius: 10px;
          overflow: hidden; margin-bottom: 20px;
          transition: border-color .2s;
        }
        .phone-input-wrap:focus-within { border-color: var(--navy-2); }
        .modal-submit-btn {
          width: 100%; height: 48px; border-radius: 10px;
          background: var(--navy); color: white;
          font-size: 14px; font-weight: 700;
          border: none; cursor: pointer;
          font-family: var(--font-jakarta);
          transition: all .2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .modal-submit-btn:hover { background: var(--navy-2); transform: translateY(-1px); }
        .modal-submit-btn:disabled { background: #94A3B8; cursor: not-allowed; transform: none; }
        @media (max-width: 600px) {
          .modal-left-panel { display: none; }
          .modal-box { border-radius: 16px; }
        }
      `}</style>
    </div>
  );
}