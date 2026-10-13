import React, { useState } from 'react';
import { Flame, ChevronUp, ChevronDown, AlertCircle, Wind, Mountain, Snowflake } from 'lucide-react';

export function NASAEventsList({ events, selectedEvent, onSelectEvent }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!events || events.length === 0) return null;

  const getEventIcon = (category) => {
    const c = category?.toLowerCase() || '';
    if (c.includes('wildfire') || c.includes('fire')) return <Flame className="w-3.5 h-3.5 text-amber-400" />;
    if (c.includes('storm') || c.includes('cyclone') || c.includes('hurricane')) return <Wind className="w-3.5 h-3.5 text-cyan-400" />;
    if (c.includes('volcano')) return <Mountain className="w-3.5 h-3.5 text-rose-400" />;
    if (c.includes('ice') || c.includes('snow')) return <Snowflake className="w-3.5 h-3.5 text-blue-300" />;
    return <AlertCircle className="w-3.5 h-3.5 text-amber-300" />;
  };

  return (
    <div className="absolute bottom-10 right-4 z-20 max-w-[340px] pointer-events-auto">
      <div className="glass-panel rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl">
        {/* Toggle Bar */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3.5 py-2.5 bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-slate-950/80 flex items-center justify-between text-xs font-semibold text-slate-200 hover:text-white transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-300 font-mono tracking-wider text-[11px] uppercase font-bold">
              ACTIVE NASA HAZARDS ({events.length})
            </span>
          </div>
          {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
        </button>

        {/* Collapsible List */}
        {isOpen && (
          <div className="max-h-60 overflow-y-auto p-2 space-y-1 bg-slate-950/80 divide-y divide-slate-800/40">
            {events.map((ev) => {
              const isSelected = selectedEvent?.id === ev.id;
              return (
                <button
                  key={ev.id}
                  onClick={() => onSelectEvent(ev)}
                  className={`w-full text-left p-2 rounded-xl text-xs transition-all flex items-start gap-2.5 ${
                    isSelected 
                      ? 'bg-amber-500/20 border border-amber-500/40 text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                      : 'hover:bg-slate-800/60 text-slate-300'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {getEventIcon(ev.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold block truncate text-[11px]">
                      {ev.title}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400 font-mono">
                      <span>{ev.category}</span>
                      {ev.date && (
                        <span>• {new Date(ev.date).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
