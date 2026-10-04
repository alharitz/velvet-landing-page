"use client";
import { useId } from "react";

interface Props { fabricKey: string }

const colors: Record<string,string> = {
  "fabric-merino-wool": "#9A6B4F",
  "fabric-selvedge-denim": "#2C3E50",
  "fabric-organic-cotton": "#ECE5DA",
  "fabric-cashmere-blend": "#D4A574",
};

export default function FabricTexture({fabricKey}: Props){
  const id = useId();
  const color = colors[fabricKey] ?? "#aaa";
  const filterId = `${id}-${fabricKey}`;
  const turb = (
    <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="3" result="noise" />
  );
  return (
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
      <defs>
        <filter id={filterId}>
          {turb}
          <feColorMatrix type="matrix" values={
            `${parseInt(color.slice(1,3),16)/255} 0 0 0 0 `+
            `${parseInt(color.slice(3,5),16)/255} 0 0 0 0 `+
            `${parseInt(color.slice(5),16)/255} 0 0 0 0 1`
          } />
        </filter>
      </defs>
      <rect width="200" height="200" fill={color} filter={`url(#${filterId})`} />
    </svg>
  );
}
