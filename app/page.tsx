"use client";

import { useState, useEffect } from "react";
import { oraciones, misterios, jaculatorias } from "@/lib/rosario-data";
import { SectionTabs } from "@/components/rosario/section-tabs";
import { PrayerCard } from "@/components/rosario/prayer-card";
import { MysterySection } from "@/components/rosario/mystery-section";
import { JaculatoriasSection } from "@/components/rosario/jaculatorias-section";
import { RosaryGuide } from "@/components/rosario/rosary-guide";
import { EvangelioSection } from "@/components/rosario/evangelio-section";
import { CoronillaSection } from "@/components/rosario/coronilla-section";
import { ThemeToggle } from "@/components/rosario/theme-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tabs = [
  { id: "rosario", label: "Rosario" },
  { id: "misterios", label: "Misterios" },
  { id: "oraciones", label: "Oraciones" },
  { id: "coronilla", label: "Coronilla" },
  { id: "evangelio", label: "Evangelio" },
];

// Get today's mysteries based on the day of the week
function getTodaysMysteries(): string {
  const day = new Date().getDay();
  // 0 = Sunday, 1 = Monday, etc.
  switch (day) {
    case 0: // Sunday
      return "gloriosos";
    case 1: // Monday
      return "gozosos";
    case 2: // Tuesday
      return "dolorosos";
    case 3: // Wednesday
      return "gloriosos";
    case 4: // Thursday
      return "luminosos";
    case 5: // Friday
      return "dolorosos";
    case 6: // Saturday
      return "gozosos";
    default:
      return "gozosos";
  }
}

function getTodaysMysteryName(): string {
  const mystery = getTodaysMysteries();
  return misterios[mystery as keyof typeof misterios].titulo;
}

export default function RosarioPage() {
  const [activeTab, setActiveTab] = useState("rosario");
  const [todaysMystery, setTodaysMystery] = useState("");

  useEffect(() => {
    setTodaysMystery(getTodaysMysteries());
  }, []);

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 px-4 py-8 sm:py-10">
        <div className="max-w-2xl mx-auto">
          {/* Theme Toggle */}
          <div className="flex justify-end mb-6">
            <ThemeToggle />
          </div>

          <div className="text-center space-y-4">
            {/* Tau Cross - Franciscan Symbol */}
            <div
              className="text-primary/70 text-4xl sm:text-5xl font-light select-none transition-colors duration-500"
              aria-hidden="true"
              style={{ fontFamily: 'Georgia, serif' }}
            >
              τ
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-semibold text-foreground text-balance">
                Santo Rosario
              </h1>
              <p className="text-muted-foreground text-sm italic px-4">
                Una capilla digital, silenciosa y accesible
              </p>
            </div>
            {todaysMystery && (
              <p className="text-sm text-primary/80 font-medium pt-2">
                Hoy: {getTodaysMysteryName()}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <SectionTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Rosario Section - Guide and Jaculatorias combined */}
        {activeTab === "rosario" && (
          <section className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Cómo rezar el Rosario
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                El Santo Rosario es una oración contemplativa centrada en los
                misterios de la vida de Cristo y de María. A través de la
                repetición de las oraciones, el corazón se aquieta y la mente
                medita.
              </p>
              <RosaryGuide />
            </div>

            <div className="border-t border-border/30 pt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Jaculatorias
              </h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                Oraciones breves para elevar el corazón a Dios en cualquier momento.
              </p>
              <JaculatoriasSection jaculatorias={jaculatorias} />
            </div>
          </section>
        )}

        {/* Oraciones Section */}
        {activeTab === "oraciones" && (
          <section>
            <Accordion type="multiple" className="space-y-2">
              {Object.entries(oraciones).map(([key, oracion]) => (
                <AccordionItem
                  key={key}
                  value={key}
                  className="border border-border/30 rounded-lg bg-card overflow-hidden"
                >
                  <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-accent/30 transition-colors">
                    <span className="text-lg font-medium text-foreground">
                      {oracion.titulo}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5">
                    <PrayerCard titulo="" texto={oracion.texto} className="py-2" />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        {/* Misterios Section */}
        {activeTab === "misterios" && (
          <section className="space-y-2">
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Los misterios del Rosario nos invitan a contemplar la vida de
              Jesús y María. Cada día de la semana tiene sus misterios
              correspondientes.
            </p>
            <div className="border border-border/30 rounded-lg bg-card overflow-hidden">
              <MysterySection
                {...misterios.gozosos}
                defaultOpen={todaysMystery === "gozosos"}
              />
              <MysterySection
                {...misterios.luminosos}
                defaultOpen={todaysMystery === "luminosos"}
              />
              <MysterySection
                {...misterios.dolorosos}
                defaultOpen={todaysMystery === "dolorosos"}
              />
              <MysterySection
                {...misterios.gloriosos}
                defaultOpen={todaysMystery === "gloriosos"}
              />
            </div>
          </section>
        )}

        {/* Coronilla Section */}
        {activeTab === "coronilla" && (
          <section>
            <CoronillaSection />
          </section>
        )}

        {/* Evangelio Section */}
        {activeTab === "evangelio" && (
          <section>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              El Evangelio del día nos acompaña en la lectio divina,
              permitiéndonos meditar la Palabra de Dios en silencio y oración.
            </p>
            <EvangelioSection />
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-10 px-4 text-center mt-12">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground/80 italic">
            «Paz y Bien»
          </p>
          <p className="text-xs text-muted-foreground/60">
            San Francisco de Asís
          </p>
        </div>
      </footer>
    </main>
  );
}
