"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// We'll use a canvas-based globe — no external lib needed
// Draws a simple sphere with lat/long grid lines + Kolkata pin

function useTime() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const rotRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const R = W * 0.42;

    // Kolkata coordinates
    const KOL_LAT = 22.5726 * (Math.PI / 180);
    const KOL_LON = 88.3639 * (Math.PI / 180);

    function latLonTo3D(lat: number, lon: number, r: number, rot: number) {
      const x = r * Math.cos(lat) * Math.sin(lon + rot);
      const y = r * Math.sin(lat);
      const z = r * Math.cos(lat) * Math.cos(lon + rot);
      return { x, y, z };
    }

    function project(x: number, y: number, z: number) {
      return { px: cx + x, py: cy - y, visible: z > 0 };
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      const rot = rotRef.current;

      // Globe background
      const bgGrad = ctx.createRadialGradient(cx - R * 0.2, cy - R * 0.2, 0, cx, cy, R);
      bgGrad.addColorStop(0, "rgba(30,35,80,0.9)");
      bgGrad.addColorStop(0.6, "rgba(15,18,50,0.95)");
      bgGrad.addColorStop(1, "rgba(8,10,30,0.98)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = bgGrad;
      ctx.fill();

      // Globe border glow
      const borderGrad = ctx.createRadialGradient(cx, cy, R - 2, cx, cy, R + 8);
      borderGrad.addColorStop(0, "rgba(100,120,255,0.15)");
      borderGrad.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(80,100,200,0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Lat lines
      for (let lat = -80; lat <= 80; lat += 20) {
        const latR = lat * (Math.PI / 180);
        const y = R * Math.sin(latR);
        const r2 = Math.sqrt(R * R - y * y);
        ctx.beginPath();
        for (let lon = -180; lon <= 180; lon += 2) {
          const lonR = lon * (Math.PI / 180);
          const x = r2 * Math.sin(lonR + rot);
          const z = r2 * Math.cos(lonR + rot);
          const px = cx + x;
          const py = cy - y;
          if (z > 0) {
            if (lon === -180) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          } else {
            ctx.moveTo(px, py);
          }
        }
        ctx.strokeStyle = "rgba(255,255,255,0.04)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Lon lines
      for (let lon = 0; lon < 360; lon += 20) {
        const lonR = lon * (Math.PI / 180);
        ctx.beginPath();
        for (let lat = -90; lat <= 90; lat += 2) {
          const latR = lat * (Math.PI / 180);
          const x = R * Math.cos(latR) * Math.sin(lonR + rot);
          const y = R * Math.sin(latR);
          const z = R * Math.cos(latR) * Math.cos(lonR + rot);
          const px = cx + x;
          const py = cy - y;
          if (z > 0) {
            if (lat === -90) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          } else {
            ctx.moveTo(px, py);
          }
        }
        ctx.strokeStyle = "rgba(255,255,255,0.04)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Globe shine
      const shineGrad = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, 0, cx, cy, R);
      shineGrad.addColorStop(0, "rgba(180,190,255,0.07)");
      shineGrad.addColorStop(0.5, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = shineGrad;
      ctx.fill();

      // Kolkata dot
      const kol = latLonTo3D(KOL_LAT, KOL_LON, R, rot);
      const kolP = project(kol.x, kol.y, kol.z);

      if (kolP.visible) {
        // Pulse rings
        const pulse = (Date.now() % 2000) / 2000;
        const pr1 = pulse * 18;
        const pr2 = ((pulse + 0.4) % 1) * 18;

        ctx.beginPath();
        ctx.arc(kolP.px, kolP.py, pr1, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(249,115,22,${0.4 * (1 - pulse)})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(kolP.px, kolP.py, pr2, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(249,115,22,${0.3 * (1 - (pulse + 0.4) % 1)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // Dot glow
        const dotGlow = ctx.createRadialGradient(kolP.px, kolP.py, 0, kolP.px, kolP.py, 8);
        dotGlow.addColorStop(0, "rgba(249,115,22,0.9)");
        dotGlow.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(kolP.px, kolP.py, 8, 0, Math.PI * 2);
        ctx.fillStyle = dotGlow;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(kolP.px, kolP.py, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#f97316";
        ctx.fill();
      }

      // Clip to circle
      ctx.save();
      ctx.globalCompositeOperation = "destination-in";
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.restore();

      rotRef.current += 0.003;
      animRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={280}
      height={280}
      className="block mx-auto"
      style={{ imageRendering: "crisp-edges" }}
    />
  );
}

export function GlobeCard() {
  const time = useTime();

  const istTime = time.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const istDate = time.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative rounded-3xl overflow-hidden border"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: "rgba(255,255,255,0.07)",
      }}
    >
      {/* Top text */}
      <div className="px-6 pt-6 pb-2">
        <p className="text-xs font-mono uppercase tracking-widest text-foreground/25 mb-1">
          Location
        </p>
        <h3 className="text-xl font-semibold text-foreground/80">
          I&apos;m very flexible with
        </h3>
        <h3 className="text-xl font-semibold" style={{ color: "rgba(255,255,255,0.45)" }}>
          time zone communications
        </h3>
      </div>

      {/* Globe */}
      <div className="relative py-4">
        {/* Atmosphere glow behind globe */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 rounded-full blur-3xl opacity-20"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)" }} />
        </div>
        <GlobeCanvas />
      </div>

      {/* Bottom info */}
      <div className="px-6 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🇮🇳</span>
              <span className="text-sm font-semibold text-foreground/80">Kolkata, India</span>
            </div>
            <p className="text-xs text-foreground/35 font-mono">IST · UTC +5:30</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-mono font-semibold text-foreground/70">{istTime}</p>
            <p className="text-xs font-mono text-foreground/30">{istDate}</p>
          </div>
        </div>

        {/* Available indicator */}
        <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-50" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-xs text-foreground/40">Available for remote worldwide</span>
        </div>
      </div>
    </motion.div>
  );
}