import { useState } from "react";

export default function Album({ albumInfo }) {
  const { href, src, alt } = albumInfo;

  return (
    <>
      <div className="border-2 border-slate-400 flex-none">
        <a href={href}>
          <img src={src} alt={alt} className="w-[6.5rem] min-h-28" />
        </a>
      </div>
    </>
  );
}
