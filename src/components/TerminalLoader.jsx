import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TerminalLoader({ fullName }) {
  const [loading, setLoading] = useState(true);
  const [typedName, setTypedName] = useState("");

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullName.length) {
        setTypedName(fullName.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 700);
      }
    }, 75);
    return () => clearInterval(interval);
  }, [fullName]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030712]"
        >
          <div className="relative mb-6">
            <div className="w-28 h-28 rounded-full border-2 border-cyan-500/60 p-1 shadow-2xl shadow-cyan-500/30">
              <img
                src="/avatar.jpg"
                alt={fullName}
                onError={(e) => {
                  e.target.src = "/favicon.jpg";
                }}
                className="w-full h-full rounded-full object-cover object-top"
              />
            </div>
          </div>

          <p className="text-xs font-mono text-cyan-400 mb-2 tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            satyam@terminal : ~ $ whoami
          </p>

          <h1 className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight flex items-center">
            {typedName}
            <span className="w-3 h-7 bg-cyan-400 ml-1.5 animate-pulse" />
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}