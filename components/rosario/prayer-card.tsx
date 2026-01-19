"use client";

import { cn } from "@/lib/utils";

interface PrayerCardProps {
  titulo: string;
  texto: string;
  className?: string;
}

export function PrayerCard({ titulo, texto, className }: PrayerCardProps) {
  return (
    <div className={cn("py-6", className)}>
      <h3 className="text-xl font-semibold text-foreground mb-4 text-center">
        {titulo}
      </h3>
      <p
        className="text-base sm:text-lg whitespace-pre-line text-foreground/90 text-center"
        style={{
          lineHeight: 'var(--lectio-line-height)',
          letterSpacing: 'var(--lectio-letter-spacing)',
        }}
      >
        {texto}
      </p>
    </div>
  );
}
