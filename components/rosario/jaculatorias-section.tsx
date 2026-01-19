"use client";

interface Jaculatoria {
  titulo: string;
  texto: string;
}

interface JaculatoriasSectionProps {
  jaculatorias: Jaculatoria[];
}

export function JaculatoriasSection({ jaculatorias }: JaculatoriasSectionProps) {
  return (
    <div className="space-y-4 py-2">
      {jaculatorias.map((jaculatoria, index) => (
        <div
          key={index}
          className="p-4 bg-card rounded-lg border border-border/30"
        >
          <p className="text-sm text-muted-foreground mb-1 uppercase tracking-wide">
            {jaculatoria.titulo}
          </p>
          <p className="text-foreground italic leading-relaxed">
            {jaculatoria.texto}
          </p>
        </div>
      ))}
    </div>
  );
}
