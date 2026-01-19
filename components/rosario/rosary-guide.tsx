"use client";

import { guiaRosario } from "@/lib/rosario-data";

export function RosaryGuide() {
  return (
    <div className="py-4 space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">
            1
          </span>
          Inicio del Rosario
        </h3>
        <ul className="space-y-2 pl-8">
          {guiaRosario.inicio.map((paso, index) => (
            <li
              key={index}
              className="text-muted-foreground relative before:content-['•'] before:absolute before:-left-4 before:text-primary/50"
            >
              {paso}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">
            2
          </span>
          Cada Decena (5 veces)
        </h3>
        <ul className="space-y-2 pl-8">
          {guiaRosario.decena.map((paso, index) => (
            <li
              key={index}
              className="text-muted-foreground relative before:content-['•'] before:absolute before:-left-4 before:text-primary/50"
            >
              {paso}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">
            3
          </span>
          Final del Rosario
        </h3>
        <ul className="space-y-2 pl-8">
          {guiaRosario.final.map((paso, index) => (
            <li
              key={index}
              className="text-muted-foreground relative before:content-['•'] before:absolute before:-left-4 before:text-primary/50"
            >
              {paso}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
