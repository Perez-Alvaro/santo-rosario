"use client";

import { useState } from "react";
import { coronillaMisericordia } from "@/lib/rosario-data";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock } from "lucide-react";

// ── Progress bar ──────────────────────────────────────────────────────────────
const STEPS = [
    { id: "introduccion", label: "Introducción" },
    { id: "decena-1",     label: "Decena 1" },
    { id: "decena-2",     label: "Decena 2" },
    { id: "decena-3",     label: "Decena 3" },
    { id: "decena-4",     label: "Decena 4" },
    { id: "decena-5",     label: "Decena 5" },
    { id: "conclusion",  label: "Conclusión" },
] as const;

type StepId = typeof STEPS[number]["id"];

function ProgressBar({ openSteps }: { openSteps: StepId[] }) {
    return (
        <div className="border border-border/30 rounded-lg bg-card p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60 mb-3">
                Progreso de la oración
            </p>
            <div className="flex items-center gap-0">
                {STEPS.map((step, i) => {
                    const done = openSteps.includes(step.id);
                    const isLast = i === STEPS.length - 1;
                    return (
                        <div key={step.id} className="flex items-center flex-1 min-w-0">
                            <div className="flex flex-col items-center flex-shrink-0">
                                <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-all duration-300 ${
                                        done
                                            ? "bg-primary border-primary text-primary-foreground"
                                            : "bg-transparent border-border/40 text-muted-foreground/50"
                                    }`}
                                >
                                    {i + 1}
                                </div>
                                <span
                                    className={`text-[9px] mt-1 text-center leading-tight max-w-[48px] ${
                                        done ? "text-primary font-semibold" : "text-muted-foreground/50"
                                    }`}
                                >
                                    {step.label}
                                </span>
                            </div>
                            {!isLast && (
                                <div
                                    className={`flex-1 h-0.5 mx-1 transition-all duration-300 ${
                                        done ? "bg-primary/60" : "bg-border/40"
                                    }`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ── Prayer card ───────────────────────────────────────────────────────────────
function PrayerCard({
    label,
    count,
    text,
}: {
    label: string;
    count: string;
    text: string;
}) {
    return (
        <div className="rounded-lg border border-border/30 bg-background/40 p-4 space-y-2">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-primary">{label}</h4>
                <span className="text-xs font-bold text-primary/70 bg-primary/10 px-2 py-0.5 rounded-full">
                    {count}
                </span>
            </div>
            <p
                className="text-foreground text-[15px] leading-relaxed"
                style={{
                    lineHeight: "var(--lectio-line-height)",
                    letterSpacing: "var(--lectio-letter-spacing)",
                }}
            >
                {text}
            </p>
        </div>
    );
}

// ── Main component ────────────────────────────────────────────────────────────
export function CoronillaSection() {
    const [openSteps, setOpenSteps] = useState<StepId[]>([]);

    function toggle(id: StepId) {
        setOpenSteps((prev) =>
            prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
        );
    }

    return (
        <div className="space-y-6">
            {/* Image of Divine Mercy */}
            <div className="border border-border/30 rounded-lg bg-card overflow-hidden">
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] bg-muted/20">
                    <img
                        src="/divina-misericordia.jpg"
                        alt="Imagen de Jesús de la Divina Misericordia"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = "none";
                            const parent = target.parentElement;
                            if (parent) {
                                parent.innerHTML = `
                  <div class="flex items-center justify-center h-full">
                    <p class="text-muted-foreground text-sm italic px-4 text-center">
                      Coloca una imagen llamada "divina-misericordia.jpg" en la carpeta public
                    </p>
                  </div>
                `;
                            }
                        }}
                    />
                </div>
            </div>

            {/* Progress bar */}
            <ProgressBar openSteps={openSteps} />

            {/* Title & description */}
            <div className="border border-border/30 rounded-lg bg-card p-6">
                <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-primary" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold text-foreground mb-2">
                            {coronillaMisericordia.titulo}
                        </h2>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {coronillaMisericordia.descripcion}
                        </p>
                    </div>
                </div>
            </div>

            {/* Hora de la Misericordia — alerta contemplativa (CAMBIO 4) */}
            <div className="rounded-lg border border-accent/40 bg-accent/20 p-5 flex gap-4 items-start">
                <div className="flex-shrink-0 mt-0.5">
                    <div className="w-10 h-10 rounded-full bg-accent/40 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                    </div>
                </div>
                <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground">
                            {coronillaMisericordia.horario.titulo}
                        </h3>
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            15:00 hs
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                        {coronillaMisericordia.horario.descripcion}
                    </p>
                </div>
            </div>

            {/* Guía paso a paso — colapsado por defecto (CAMBIO 4) */}
            <div className="border border-border/30 rounded-lg bg-card overflow-hidden">
                <Accordion type="single" collapsible>
                    <AccordionItem value="guia" className="border-none">
                        <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-accent/30 transition-colors">
                            <span className="text-lg font-medium text-foreground">
                                Guía paso a paso
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-6">
                            <div className="space-y-3">
                                {coronillaMisericordia.guia.map((paso, index) => (
                                    <p
                                        key={index}
                                        className="text-foreground text-sm leading-relaxed"
                                    >
                                        {paso}
                                    </p>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            {/* Prayers with progress tracking */}
            <div className="border border-border/30 rounded-lg bg-card overflow-hidden">
                <Accordion
                    type="multiple"
                    value={openSteps}
                    onValueChange={(vals) => setOpenSteps(vals as StepId[])}
                    className="divide-y divide-border/30"
                >
                    {/* Introduction */}
                    <AccordionItem value="introduccion" className="border-none">
                        <AccordionTrigger
                            className="px-5 py-4 hover:no-underline hover:bg-accent/30 transition-colors"
                        >
                            <span className="text-lg font-medium text-foreground">
                                {coronillaMisericordia.introduccion.titulo}
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-6">
                            <div className="space-y-6">
                                {coronillaMisericordia.introduccion.oraciones.map((oracion, index) => (
                                    <div key={index} className="space-y-2">
                                        <h4 className="text-sm font-semibold text-primary">
                                            {oracion.nombre}
                                        </h4>
                                        <p
                                            className="text-foreground text-[15px] leading-relaxed"
                                            style={{
                                                lineHeight: "var(--lectio-line-height)",
                                                letterSpacing: "var(--lectio-letter-spacing)",
                                            }}
                                        >
                                            {oracion.texto}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Decenas 1–5 — oraciones siempre visibles sin acordeón interno (CAMBIO 4) */}
                    {[1, 2, 3, 4, 5].map((n) => (
                        <AccordionItem
                            key={`decena-${n}`}
                            value={`decena-${n}` as StepId}
                            className="border-none"
                        >
                            <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-accent/30 transition-colors">
                                <span className="text-lg font-medium text-foreground">
                                    Decena {n}
                                </span>
                            </AccordionTrigger>
                            <AccordionContent className="px-5 pb-6">
                                <div className="space-y-4">
                                    <PrayerCard
                                        label={coronillaMisericordia.decena.cuentaGrande.nombre}
                                        count="× 1"
                                        text={coronillaMisericordia.decena.cuentaGrande.texto}
                                    />
                                    <PrayerCard
                                        label={coronillaMisericordia.decena.cuentasPequenas.nombre}
                                        count="× 10"
                                        text={coronillaMisericordia.decena.cuentasPequenas.texto}
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}

                    {/* Conclusion */}
                    <AccordionItem value="conclusion" className="border-none">
                        <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-accent/30 transition-colors">
                            <span className="text-lg font-medium text-foreground">
                                {coronillaMisericordia.conclusion.titulo}
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-6">
                            <div className="space-y-6">
                                {coronillaMisericordia.conclusion.oraciones.map((oracion, index) => (
                                    <div key={index} className="space-y-2">
                                        <h4 className="text-sm font-semibold text-primary">
                                            {oracion.nombre}
                                        </h4>
                                        <p
                                            className="text-foreground text-[15px] leading-relaxed"
                                            style={{
                                                lineHeight: "var(--lectio-line-height)",
                                                letterSpacing: "var(--lectio-letter-spacing)",
                                            }}
                                        >
                                            {oracion.texto}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
