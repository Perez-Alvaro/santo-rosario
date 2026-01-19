"use client";

import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Reading {
  type: string;
  reference: string;
  title: string;
  text: string;
}

interface LiturgiaData {
  fecha: string;
  liturgia?: string;
  primeraLectura?: Reading;
  salmo?: Reading;
  segundaLectura?: Reading;
  evangelio?: Reading;
  error?: boolean;
  mensaje?: string;
}

export function EvangelioSection() {
  const [liturgia, setLiturgia] = useState<LiturgiaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLiturgia() {
      try {
        const response = await fetch("/api/evangelio");
        const data = await response.json();
        setLiturgia(data);
      } catch (error) {
        console.error("Error loading liturgia:", error);
        setLiturgia({
          fecha: new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          error: true,
          mensaje: "La liturgia del día no está disponible en este momento. Te invitamos a continuar con tu oración.",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchLiturgia();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-muted-foreground text-sm italic">
          Cargando la liturgia del día...
        </div>
      </div>
    );
  }

  if (!liturgia) {
    return null;
  }

  // If there's an error, show a gentle message
  if (liturgia.error) {
    return (
      <div className="border border-border/30 rounded-lg bg-card p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium text-foreground mb-2">
            Liturgia del día
          </h3>
          <p className="text-sm text-muted-foreground capitalize mb-4">
            {liturgia.fecha}
          </p>
          <p className="text-muted-foreground text-sm italic leading-relaxed">
            {liturgia.mensaje}
          </p>
        </div>
      </div>
    );
  }

  // Clean HTML tags and verse numbers from text for better readability
  const cleanText = (text: string) => {
    return text
      // Remove HTML tags
      .replace(/<[^>]*>/g, "")
      // Remove HTML entities
      .replace(/&nbsp;/g, " ")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      // Remove Bible verse references in format [[Book chapter,verse]]
      .replace(/\[\[[^\]]+\]\]/g, "")
      // Remove verse numbers (e.g., "1 ", "12 ", "123 " at the start of lines or after line breaks)
      .replace(/(\n|^)\s*\d+\s+/g, "$1")
      // Remove inline verse numbers (numbers between spaces)
      .replace(/\s+\d+\s+/g, " ")
      // Clean up multiple spaces
      .replace(/\s{2,}/g, " ")
      // Clean up multiple line breaks
      .replace(/\n{3,}/g, "\n\n")
      // Trim
      .trim();
  };

  // Render a reading section
  const renderReading = (reading: Reading | undefined, defaultValue?: string) => {
    if (!reading || !reading.text) return null;

    return (
      <AccordionItem value={reading.type} className="border-none">
        <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-accent/30 transition-colors">
          <div className="flex flex-col items-start text-left">
            <span className="text-lg font-medium text-foreground">
              {reading.title}
            </span>
            {reading.reference && (
              <span className="text-sm text-primary/80 mt-1">
                {reading.reference}
              </span>
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-5 pb-6">
          <div className="space-y-4">
            {/* Reading text - optimized for lectio divina */}
            <div className="mt-2">
              <p
                className="text-foreground text-[15px] sm:text-base whitespace-pre-line"
                style={{
                  lineHeight: 'var(--lectio-line-height)',
                  letterSpacing: 'var(--lectio-letter-spacing)',
                }}
              >
                {cleanText(reading.text)}
              </p>
            </div>

            {/* Citation at the end */}
            {reading.reference && (
              <p className="text-sm text-muted-foreground text-right pt-2 border-t border-border/30">
                — {reading.reference}
              </p>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  return (
    <div className="space-y-4">
      {/* Liturgical date header */}
      <div className="border border-border/30 rounded-lg bg-card p-4">
        <p className="text-sm text-muted-foreground capitalize text-center">
          {liturgia.liturgia || liturgia.fecha}
        </p>
      </div>

      {/* Readings */}
      <div className="border border-border/30 rounded-lg bg-card overflow-hidden">
        <Accordion type="multiple" defaultValue={["gospel"]} className="divide-y divide-border/30">
          {/* Primera Lectura - Always show when available */}
          {liturgia.primeraLectura && renderReading(liturgia.primeraLectura)}

          {/* Salmo - Always show */}
          {renderReading(liturgia.salmo)}

          {/* Segunda Lectura - Always show when available */}
          {liturgia.segundaLectura && renderReading(liturgia.segundaLectura)}

          {/* Evangelio - Always show */}
          {renderReading(liturgia.evangelio, "gospel")}
        </Accordion>
      </div>
    </div>
  );
}
