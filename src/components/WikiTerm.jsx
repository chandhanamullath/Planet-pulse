import React from 'react';

export function WikiTerm({ termKey, onClickWiki, children }) {
  return (
    <span
      role="button"
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        if (onClickWiki) onClickWiki(termKey);
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.stopPropagation();
          if (onClickWiki) onClickWiki(termKey);
        }
      }}
      className="inline-flex items-baseline gap-0.5 cursor-pointer border-b border-dashed border-[#00f5d4]/60 hover:border-[#00f5d4] hover:text-[#00f5d4] text-inherit transition-colors"
      title="Click to view Wikipedia explanation"
    >
      <span>{children}</span>
      <span className="text-[9px] text-[#00f5d4] font-mono select-none">ⓘ</span>
    </span>
  );
}
