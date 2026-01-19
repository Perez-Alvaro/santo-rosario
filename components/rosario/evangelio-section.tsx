"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface EvangelioData {
  fecha: string;
  cita: string;
  titulo: string;
  texto: string;
  liturgia?: string;
  error?: boolean;
  mensaje?: string;
}

export function EvangelioSection() {
  const [evangelio, setEvangelio] = useState<EvangelioData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvangelio() {
      try {
        const response = await fetch("/api/evangelio");
        const data = await response.json();
        setEvangelio(data);
      } catch (error) {
        console.error("Error loading evangelio:", error);
        setEvangelio({
          fecha: new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          cita: "",
          titulo: "Evangelio del día",
          texto: "",
          error: true,
          mensaje: "El Evangelio del día no está disponible en este momento. Te invitamos a continuar con tu oración.",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchEvangelio();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground text-sm italic">
          Cargando el Evangelio del día...
        </div>
      </div>
    );
  }

  if (!evangelio) {
    return null;
  }

  // If there's an error or no text, show a gentle message
  if (evangelio.error || !evangelio.texto) {
    return (
      <div className="border border-border/30 rounded-lg bg-card p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-foreground mb-2">
            Evangelio del día
          </h3>
          <p className="text-sm text-muted-foreground capitalize mb-4">
            {evangelio.fecha}
          </p>
          <p className="text-muted-foreground text-sm italic leading-relaxed">
            {evangelio.mensaje || "El Evangelio del día no está disponible en este momento. Te invitamos a continuar con tu oración."}
          </p>
        </div>
      </div>
    );
  }

  // Clean HTML tags from text if present
  const cleanText = evangelio.texto
    .replace(/<[^>]*>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

  return (
    <div className="border border-border/30 rounded-lg bg-card overflow-hidden">
      <Accordion type="single" collapsible defaultValue="evangelio">
        <AccordionItem value="evangelio" className="border-none">
          <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-accent/30 transition-colors">
            <div className="flex flex-col items-start text-left">
              <span className="text-lg font-medium text-foreground">
                Evangelio del día
              </span>
              {evangelio.cita && (
                <span className="text-sm text-primary/80 mt-1">
                  {evangelio.cita}
                </span>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-5 pb-6">
            <div className="space-y-4">
              {/* Liturgical date */}
              <p className="text-sm text-muted-foreground capitalize border-b border-border/30 pb-3">
                {evangelio.liturgia || evangelio.fecha}
              </p>

              {/* Gospel title if different from citation */}
              {evangelio.titulo && evangelio.titulo !== "Evangelio del día" && (
                <h4 className="text-base font-medium text-foreground italic">
                  {evangelio.titulo}
                </h4>
              )}

              {/* Gospel text - optimized for lectio divina */}
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground leading-[1.8] text-base whitespace-pre-line">
                  {cleanText}
                </p>
              </div>

              {/* Citation at the end */}
              {evangelio.cita && (
                <p className="text-sm text-muted-foreground text-right pt-2 border-t border-border/30">
                  — {evangelio.cita}
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
