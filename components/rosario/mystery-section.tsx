"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

interface Misterio {
  numero: number;
  titulo: string;
  contemplacion: string;
}

interface MysterySectionProps {
  titulo: string;
  dias: string;
  misterios: Misterio[];
  defaultOpen?: boolean;
}

export function MysterySection({
  titulo,
  dias,
  misterios,
  defaultOpen = false,
}: MysterySectionProps) {
  return (
    <div className="border-b border-border/50 last:border-b-0">
      <Accordion
        type="single"
        collapsible
        defaultValue={defaultOpen ? "mysteries" : undefined}
      >
        <AccordionItem value="mysteries" className="border-none">
          <AccordionTrigger className="py-5 px-4 hover:no-underline hover:bg-accent/30 transition-colors">
            <div className="flex flex-col items-start text-left">
              <span className="text-lg font-semibold text-foreground">
                {titulo}
              </span>
              <span className="text-sm text-muted-foreground mt-1">{dias}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 pb-6">
            <div className="space-y-6 pt-2">
              {misterios.map((misterio) => (
                <div
                  key={misterio.numero}
                  className="bg-card rounded-lg p-5 border border-border/30"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                      {misterio.numero}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-2">
                        {misterio.titulo}
                      </h4>
                      <p
                        className="text-muted-foreground text-[14px] sm:text-[15px]"
                        style={{
                          lineHeight: 'var(--lectio-line-height)',
                          letterSpacing: 'var(--lectio-letter-spacing)',
                        }}
                      >
                        {misterio.contemplacion}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
