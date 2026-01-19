"use client";

import { coronillaMisericordia } from "@/lib/rosario-data";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Clock } from "lucide-react";

export function CoronillaSection() {
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
                            // Fallback if image doesn't exist
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
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

            {/* Header with time indicator */}
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
                        <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                            {coronillaMisericordia.descripcion}
                        </p>
                        <div className="bg-accent/20 border border-accent/30 rounded-lg p-4">
                            <h3 className="text-sm font-semibold text-foreground mb-2">
                                {coronillaMisericordia.horario.titulo}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed italic">
                                {coronillaMisericordia.horario.descripcion}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Guide */}
            <div className="border border-border/30 rounded-lg bg-card overflow-hidden">
                <Accordion type="single" collapsible defaultValue="guia">
                    <AccordionItem value="guia" className="border-none">
                        <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-accent/30 transition-colors">
                            <span className="text-lg font-medium text-foreground">
                                Cómo rezar la Coronilla
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

            {/* Prayers */}
            <div className="border border-border/30 rounded-lg bg-card overflow-hidden">
                <Accordion type="multiple" className="divide-y divide-border/30">
                    {/* Introduction */}
                    <AccordionItem value="introduccion" className="border-none">
                        <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-accent/30 transition-colors">
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
                                                lineHeight: 'var(--lectio-line-height)',
                                                letterSpacing: 'var(--lectio-letter-spacing)',
                                            }}
                                        >
                                            {oracion.texto}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* Decade */}
                    <AccordionItem value="decena" className="border-none">
                        <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-accent/30 transition-colors">
                            <span className="text-lg font-medium text-foreground">
                                {coronillaMisericordia.decena.titulo}
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-5 pb-6">
                            <div className="space-y-6">
                                {/* Large bead */}
                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold text-primary">
                                        {coronillaMisericordia.decena.cuentaGrande.nombre}
                                    </h4>
                                    <p
                                        className="text-foreground text-[15px] leading-relaxed"
                                        style={{
                                            lineHeight: 'var(--lectio-line-height)',
                                            letterSpacing: 'var(--lectio-letter-spacing)',
                                        }}
                                    >
                                        {coronillaMisericordia.decena.cuentaGrande.texto}
                                    </p>
                                </div>

                                {/* Small beads */}
                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold text-primary">
                                        {coronillaMisericordia.decena.cuentasPequenas.nombre}
                                    </h4>
                                    <p
                                        className="text-foreground text-[15px] leading-relaxed"
                                        style={{
                                            lineHeight: 'var(--lectio-line-height)',
                                            letterSpacing: 'var(--lectio-letter-spacing)',
                                        }}
                                    >
                                        {coronillaMisericordia.decena.cuentasPequenas.texto}
                                    </p>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

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
                                                lineHeight: 'var(--lectio-line-height)',
                                                letterSpacing: 'var(--lectio-letter-spacing)',
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
