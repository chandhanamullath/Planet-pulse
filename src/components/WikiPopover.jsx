import React, { useState, useEffect } from 'react';
import { X, ExternalLink, BookOpen, Sparkles } from 'lucide-react';
import { fetchWikiExplanation } from '../services/wikipedia';

export function WikiPopover({ termKey, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!termKey) return;
    let isMounted = true;
    setLoading(true);

    fetchWikiExplanation(termKey).then(res => {
      if (isMounted) {
        setData(res);
        setLoading(false);
      }
    });

    return () => { isMounted = false; };
  }, [termKey]);

  if (!termKey) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in pointer-events-auto">
      <div className="glass-panel w-full max-w-md rounded-2xl overflow-hidden border border-[#00f5d4]/40 shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-3.5 bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#00f5d4]/10 text-[#00f5d4]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-wider uppercase text-[#00f5d4] font-bold block">
                SCIENCE & SPACE GLOSSARY
              </span>
              <span className="text-[11px] text-slate-400">
                Verified Wikipedia Telemetry Reference
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3">
          {loading ? (
            <div className="py-8 flex flex-col items-center justify-center gap-2">
              <div className="w-8 h-8 border-2 border-[#00f5d4]/30 border-t-[#00f5d4] rounded-full animate-spin" />
              <span className="text-xs font-mono text-slate-400">Loading Wikipedia summary...</span>
            </div>
          ) : data ? (
            <>
              {/* Title & Thumbnail */}
              <div className="flex items-start gap-3">
                {data.thumbnail && (
                  <img
                    src={data.thumbnail}
                    alt={data.title}
                    className="w-16 h-16 object-cover rounded-xl border border-slate-700 shrink-0 shadow-md"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {data.title}
                  </h3>
                  <span className="text-[10px] font-mono text-[#10b981] mt-0.5 block">
                    Canonical Scientific Term
                  </span>
                </div>
              </div>

              {/* Extract Summary */}
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                {data.extract}
              </p>

              {/* External Wikipedia Link */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">
                  Source: en.wikipedia.org
                </span>
                <a
                  href={data.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-[#00f5d4]/15 hover:bg-[#00f5d4]/25 text-[#00f5d4] text-xs font-semibold flex items-center gap-1.5 transition-colors border border-[#00f5d4]/30"
                >
                  <span>Read on Wikipedia</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </>
          ) : (
            <p className="text-xs text-slate-400">Terminology details currently unavailable.</p>
          )}
        </div>

      </div>
    </div>
  );
}
