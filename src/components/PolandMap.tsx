import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { REGIONS } from '../constants/regions';

const PolandMap = () => {
  // Simple seeded random number generator to ensure consistent layout across refreshes
  const seededPoints = useMemo(() => {
    let seed = 42; // Constant seed for deterministic distribution
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    return Array.from({ length: 160 }).map((_, i) => ({
      id: i,
      x: 35 + random() * 430,
      y: 55 + random() * 390,
      scale: 1.1 + random() * 0.7,
      maxOpacity: 0.8 + random() * 0.2,
      minOpacity: 0.4 + random() * 0.2,
      duration: 3 + random() * 4,
      delay: random() * 6,
      // 95% of markers should not pulse (be static)
      isPulsing: random() < 0.05 
    }));
  }, []);

  // Standard marker path (teardrop pin with a hole in the middle)
  const markerPath = "M0,0 C-1.5,-2.5 -3.5,-3.5 -3.5,-5.5 A3.5,3.5 0 1,1 3.5,-5.5 C3.5,-3.5 1.5,-2.5 0,0 Z M0,-5.5 m-1.2,0 a1.2,1.2 0 1,0 2.4,0 a1.2,1.2 0 1,0 -2.4,0 Z";

  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-none">
      <svg
        viewBox="20 40 480 440"
        className="w-full h-full max-w-[850px] relative z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="markerGlow" x="-300%" y="-300%" width="700%" height="700%">
            <feGaussianBlur stdDeviation="1.8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          
          <filter id="nationalOutlineGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <filter id="dilateBorder">
            <feMorphology operator="dilate" radius="1.2" in="SourceAlpha" result="dilated" />
            <feFlood floodColor="#f97316" floodOpacity="0.6" result="color" />
            <feComposite in="color" in2="dilated" operator="in" />
          </filter>
          
          <clipPath id="polandOutline">
            {REGIONS.map((region) => (
              <path key={`clip-${region.id}`} d={region.d} />
            ))}
          </clipPath>
        </defs>

        {/* 1. National Thick Border */}
        <g filter="url(#nationalOutlineGlow)">
          <g filter="url(#dilateBorder)">
            {REGIONS.map((region) => (
              <path key={`outline-${region.id}`} d={region.d} />
            ))}
          </g>
        </g>

        {/* 2. Internal Borders (Thin) and Voivodeship Fills */}
        <g>
          {REGIONS.map((region) => (
            <g key={region.id}>
              <path
                d={region.d}
                fill="#f97316"
                fillOpacity="0.015"
                stroke="none"
              />
              <path
                d={region.d}
                fill="none"
                stroke="#f97316"
                strokeWidth="0.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-30"
              />
            </g>
          ))}
        </g>

        {/* 3. Map Markers (Clipped to Poland) */}
        <g clipPath="url(#polandOutline)">
          {seededPoints.map((point) => (
            <motion.path
              key={point.id}
              d={markerPath}
              fill="#fff8f1" // Delicate White-Orange/Cream
              fillRule="evenodd"
              filter="url(#markerGlow)"
              transform={`translate(${point.x}, ${point.y}) scale(${point.scale})`}
              initial={{ opacity: point.isPulsing ? point.minOpacity : point.maxOpacity }}
              animate={point.isPulsing ? { 
                opacity: [point.minOpacity, point.maxOpacity, point.minOpacity] 
              } : undefined}
              transition={point.isPulsing ? {
                duration: point.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: point.delay
              } : undefined}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default PolandMap;
