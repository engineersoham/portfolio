"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
// import { PERSON } from "@/lib/constants";
import { PERSON } from "@/lib/constans";

// ✅ Dynamic import with ssr:false — required for cobe globe to work
const World = dynamic(() => import("@/components/ui/globe").then((m) => m.World), {
  ssr: false,
  loading: () => (
    <div className="w-full h-72 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-foreground/20 border-t-foreground/60 animate-spin" />
    </div>
  ),
});

const globeConfig = {
  pointSize: 3,
  globeColor: "#0f172a",
  showAtmosphere: true,
  atmosphereColor: "#818cf8",
  atmosphereAltitude: 0.12,
  emissive: "#0f172a",
  emissiveIntensity: 0.15,
  shininess: 0.9,
  polygonColor: "rgba(148,163,184,0.5)",
  ambientLight: "#818cf8",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1200,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.5726, lng: 88.3639 }, // Kolkata
  autoRotate: true,
  autoRotateSpeed: 0.4,
};

const colors = ["#6366f1", "#8b5cf6", "#38bdf8"];

// Arcs from Kolkata to major tech hubs
const arcs = [
  { order: 1, startLat: 22.5726, startLng: 88.3639, endLat: 37.7749, endLng: -122.4194, arcAlt: 0.5, color: colors[0] },
  { order: 1, startLat: 22.5726, startLng: 88.3639, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.4, color: colors[1] },
  { order: 2, startLat: 22.5726, startLng: 88.3639, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.3, color: colors[2] },
  { order: 2, startLat: 22.5726, startLng: 88.3639, endLat: 40.7128, endLng: -74.006, arcAlt: 0.5, color: colors[0] },
  { order: 3, startLat: 22.5726, startLng: 88.3639, endLat: 1.3521, endLng: 103.8198, arcAlt: 0.2, color: colors[1] },
  { order: 3, startLat: 22.5726, startLng: 88.3639, endLat: 48.8566, endLng: 2.3522, arcAlt: 0.4, color: colors[2] },
  { order: 4, startLat: 22.5726, startLng: 88.3639, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.5, color: colors[0] },
  { order: 4, startLat: 22.5726, startLng: 88.3639, endLat: 52.52, endLng: 13.405, arcAlt: 0.4, color: colors[1] },
  { order: 5, startLat: 22.5726, startLng: 88.3639, endLat: 43.6532, endLng: -79.3832, arcAlt: 0.5, color: colors[2] },
  { order: 6, startLat: 37.7749, startLng: -122.4194, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[1] },
  { order: 6, startLat: 40.7128, startLng: -74.006, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.4, color: colors[2] },
];

export function GlobeSection() {
  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-3">
            Based in
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {PERSON.location} 🇮🇳
          </h2>
          <p className="text-foreground/45 text-sm max-w-sm mx-auto">
            Working with clients and teams across the globe — remotely and async-first.
          </p>
        </motion.div>

        {/* Globe — visible on page */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full h-[500px]"
        >
          {/* Glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div style={{
              width: 400, height: 400, borderRadius: "50%",
              background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
            }} />
          </div>

          <World data={arcs} globeConfig={globeConfig} />

          {/* Bottom fade into background */}
          <div className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent, var(--color-background))" }}
          />
        </motion.div>

        {/* Info cards below globe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 -mt-12 relative z-10"
        >
          {[
            { value: PERSON.timezone, label: "Timezone" },
            { value: "Remote", label: "Work style" },
            { value: "English + বাংলা", label: "Languages" },
          ].map((item) => (
            <div key={item.label}
              className="text-center px-6 py-3 rounded-2xl border border-border bg-card/80 backdrop-blur-sm">
              <p className="text-sm font-semibold text-foreground">{item.value}</p>
              <p className="text-xs text-foreground/40 mt-0.5">{item.label}</p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}