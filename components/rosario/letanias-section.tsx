"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface Letania {
  invocacion: string;
  respuesta: string;
}

interface GrupoLetanias {
  titulo: string;
  descripcion?: string;
  letanias: Letania[];
  tipo: "dialogada" | "simple";
}

const gruposLetanias: GrupoLetanias[] = [
  {
    titulo: "Letanías de la Humildad",
    descripcion: "Atribuidas al Cardenal Rafael Merry del Val — oración para morir al propio yo",
    tipo: "dialogada",
    letanias: [
      { invocacion: "De desear ser estimado,", respuesta: "líbrame, Jesús." },
      { invocacion: "De desear ser amado,", respuesta: "líbrame, Jesús." },
      { invocacion: "De desear ser buscado,", respuesta: "líbrame, Jesús." },
      { invocacion: "De desear ser honrado,", respuesta: "líbrame, Jesús." },
      { invocacion: "De desear ser alabado,", respuesta: "líbrame, Jesús." },
      { invocacion: "De desear ser preferido a otros,", respuesta: "líbrame, Jesús." },
      { invocacion: "De desear ser consultado,", respuesta: "líbrame, Jesús." },
      { invocacion: "De desear ser aprobado,", respuesta: "líbrame, Jesús." },
      { invocacion: "Del temor de ser humillado,", respuesta: "líbrame, Jesús." },
      { invocacion: "Del temor de ser despreciado,", respuesta: "líbrame, Jesús." },
      { invocacion: "Del temor de sufrir repulsas,", respuesta: "líbrame, Jesús." },
      { invocacion: "Del temor de ser calumniado,", respuesta: "líbrame, Jesús." },
      { invocacion: "Del temor de ser olvidado,", respuesta: "líbrame, Jesús." },
      { invocacion: "Del temor de ser ridiculizado,", respuesta: "líbrame, Jesús." },
      { invocacion: "Del temor de ser injuriado,", respuesta: "líbrame, Jesús." },
      { invocacion: "Del temor de ser sospechoso,", respuesta: "líbrame, Jesús." },
      { invocacion: "Que otros sean más amados que yo,", respuesta: "Jesús, concédemelo." },
      { invocacion: "Que otros sean más estimados que yo,", respuesta: "Jesús, concédemelo." },
      { invocacion: "Que otros crezcan en opinión y yo disminuya,", respuesta: "Jesús, concédemelo." },
      { invocacion: "Que otros sean elegidos y yo olvidado,", respuesta: "Jesús, concédemelo." },
      { invocacion: "Que otros sean alabados y yo no tomado en cuenta,", respuesta: "Jesús, concédemelo." },
      { invocacion: "Que otros sean preferidos a mí en todo,", respuesta: "Jesús, concédemelo." },
      { invocacion: "Que otros sean más santos que yo con tal que yo sea todo lo santo que puedo ser,", respuesta: "Jesús, concédemelo." },
    ],
  },

  {
    titulo: "Letanías de la Santísima Trinidad",
    descripcion: "Adoración a las tres Personas Divinas",
    tipo: "dialogada",
    letanias: [
      { invocacion: "Señor, ten piedad de nosotros.", respuesta: "Señor, ten piedad." },
      { invocacion: "Cristo, ten piedad de nosotros.", respuesta: "Cristo, ten piedad." },
      { invocacion: "Señor, ten piedad de nosotros.", respuesta: "Señor, ten piedad." },
      { invocacion: "Dios Padre celestial,", respuesta: "ten misericordia de nosotros." },
      { invocacion: "Dios Hijo, Redentor del mundo,", respuesta: "ten misericordia de nosotros." },
      { invocacion: "Dios Espíritu Santo,", respuesta: "ten misericordia de nosotros." },
      { invocacion: "Santísima Trinidad, un solo Dios,", respuesta: "ten misericordia de nosotros." },
    ],
  },
  {
    titulo: "Letanías de la Santísima Virgen María",
    descripcion: "Lauretanas – Oraciones tradicionales de la Iglesia en honor a Nuestra Señora",
    tipo: "dialogada",
    letanias: [
      { invocacion: "Santa María,", respuesta: "ruega por nosotros." },
      { invocacion: "Santa Madre de Dios,", respuesta: "ruega por nosotros." },
      { invocacion: "Santa Virgen de las vírgenes,", respuesta: "ruega por nosotros." },
      { invocacion: "Madre de Cristo,", respuesta: "ruega por nosotros." },
      { invocacion: "Madre de la Iglesia,", respuesta: "ruega por nosotros." },
      { invocacion: "Madre de la misericordia,", respuesta: "ruega por nosotros." },
      { invocacion: "Madre de la divina gracia,", respuesta: "ruega por nosotros." },
      { invocacion: "Madre de la esperanza,", respuesta: "ruega por nosotros." },
      { invocacion: "Madre purísima,", respuesta: "ruega por nosotros." },
      { invocacion: "Madre castísima,", respuesta: "ruega por nosotros." },
      { invocacion: "Madre sin mancilla,", respuesta: "ruega por nosotros." },
      { invocacion: "Madre inmaculada,", respuesta: "ruega por nosotros." },
      { invocacion: "Madre amable,", respuesta: "ruega por nosotros." },
      { invocacion: "Madre admirable,", respuesta: "ruega por nosotros." },
      { invocacion: "Madre del buen consejo,", respuesta: "ruega por nosotros." },
      { invocacion: "Madre del Creador,", respuesta: "ruega por nosotros." },
      { invocacion: "Madre del Salvador,", respuesta: "ruega por nosotros." },
      { invocacion: "Virgen prudentísima,", respuesta: "ruega por nosotros." },
      { invocacion: "Virgen digna de veneración,", respuesta: "ruega por nosotros." },
      { invocacion: "Virgen digna de alabanza,", respuesta: "ruega por nosotros." },
      { invocacion: "Virgen poderosa,", respuesta: "ruega por nosotros." },
      { invocacion: "Virgen clemente,", respuesta: "ruega por nosotros." },
      { invocacion: "Virgen fiel,", respuesta: "ruega por nosotros." },
      { invocacion: "Espejo de justicia,", respuesta: "ruega por nosotros." },
      { invocacion: "Sede de la sabiduría,", respuesta: "ruega por nosotros." },
      { invocacion: "Causa de nuestra alegría,", respuesta: "ruega por nosotros." },
      { invocacion: "Vaso espiritual,", respuesta: "ruega por nosotros." },
      { invocacion: "Vaso digno de honor,", respuesta: "ruega por nosotros." },
      { invocacion: "Vaso insigne de devoción,", respuesta: "ruega por nosotros." },
      { invocacion: "Rosa mística,", respuesta: "ruega por nosotros." },
      { invocacion: "Torre de David,", respuesta: "ruega por nosotros." },
      { invocacion: "Torre de marfil,", respuesta: "ruega por nosotros." },
      { invocacion: "Casa de oro,", respuesta: "ruega por nosotros." },
      { invocacion: "Arca de la alianza,", respuesta: "ruega por nosotros." },
      { invocacion: "Puerta del cielo,", respuesta: "ruega por nosotros." },
      { invocacion: "Estrella de la mañana,", respuesta: "ruega por nosotros." },
      { invocacion: "Salud de los enfermos,", respuesta: "ruega por nosotros." },
      { invocacion: "Refugio de los pecadores,", respuesta: "ruega por nosotros." },
      { invocacion: "Consoladora de los afligidos,", respuesta: "ruega por nosotros." },
      { invocacion: "Auxilio de los cristianos,", respuesta: "ruega por nosotros." },
      { invocacion: "Reina de los ángeles,", respuesta: "ruega por nosotros." },
      { invocacion: "Reina de los patriarcas,", respuesta: "ruega por nosotros." },
      { invocacion: "Reina de los profetas,", respuesta: "ruega por nosotros." },
      { invocacion: "Reina de los apóstoles,", respuesta: "ruega por nosotros." },
      { invocacion: "Reina de los mártires,", respuesta: "ruega por nosotros." },
      { invocacion: "Reina de los confesores,", respuesta: "ruega por nosotros." },
      { invocacion: "Reina de las vírgenes,", respuesta: "ruega por nosotros." },
      { invocacion: "Reina de todos los santos,", respuesta: "ruega por nosotros." },
      { invocacion: "Reina concebida sin pecado original,", respuesta: "ruega por nosotros." },
      { invocacion: "Reina asunta al cielo,", respuesta: "ruega por nosotros." },
      { invocacion: "Reina del santísimo Rosario,", respuesta: "ruega por nosotros." },
      { invocacion: "Reina de la familia,", respuesta: "ruega por nosotros." },
      { invocacion: "Reina de la paz,", respuesta: "ruega por nosotros." },
    ],
  },
  {
    titulo: "Letanías de Consagración a Jesús por María",
    descripcion: "Propias del Tratado de la Verdadera Devoción a María de San Luis María de Montfort",
    tipo: "dialogada",
    letanias: [
      { invocacion: "Señor Jesús, Hijo de Dios vivo,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, en quien habita corporalmente toda la plenitud de la divinidad,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, rey de los siglos y Señor de los señores,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, pacientísimo,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, mansísimo y humilde de corazón,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, pobre y nacido en un pesebre,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, obediente hasta la muerte de cruz,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, amante de la pobreza y de los pobres,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, que amas a los que te buscan,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, pan de los ángeles,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, Cabeza de la Iglesia,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, esposo de las almas consagradas,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, modelo de toda virtud,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, fuerza de los mártires,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, luz y fortaleza de los confesores,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, padre de los pobres,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, maestro de los evangelistas,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, perseverancia de los santos,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, salvación y resurrección nuestra,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, esperanza de todos los hombres,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, dios de la paz y amor,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, en quien se halla el tesoro de toda ciencia y sabiduría,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, que tomas delicias en habitar entre los hijos de los hombres,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, sumo sacerdote y único mediador,", respuesta: "ten piedad de mí." },
      { invocacion: "Jesús, Cordero de Dios, que quitas el pecado del mundo,", respuesta: "ten piedad de mí." },
    ],
  },
  {
    titulo: "Letanías a la Virgen María según San Luis de Montfort",
    descripcion: "Invocaciones especiales para la consagración a Jesús por María",
    tipo: "dialogada",
    letanias: [
      { invocacion: "María, hija del Padre eterno,", respuesta: "ruega por nosotros." },
      { invocacion: "María, madre del Hijo eterno,", respuesta: "ruega por nosotros." },
      { invocacion: "María, templo del Espíritu Santo,", respuesta: "ruega por nosotros." },
      { invocacion: "María, flor de la Trinidad,", respuesta: "ruega por nosotros." },
      { invocacion: "María, paraíso terrestre del nuevo Adán,", respuesta: "ruega por nosotros." },
      { invocacion: "María, seno del Padre de los pobres,", respuesta: "ruega por nosotros." },
      { invocacion: "María, fuente de la gracia,", respuesta: "ruega por nosotros." },
      { invocacion: "María, aurora de la luz celestial,", respuesta: "ruega por nosotros." },
      { invocacion: "María, luna llena en medio de la noche,", respuesta: "ruega por nosotros." },
      { invocacion: "María, reina de los corazones,", respuesta: "ruega por nosotros." },
      { invocacion: "María, trono de la gloria,", respuesta: "ruega por nosotros." },
      { invocacion: "María, canal de la misericordia divina,", respuesta: "ruega por nosotros." },
      { invocacion: "María, custodia de nuestra fe,", respuesta: "ruega por nosotros." },
      { invocacion: "María, madre de los sacerdotes,", respuesta: "ruega por nosotros." },
      { invocacion: "María, fuente de gracia y de merecimientos,", respuesta: "ruega por nosotros." },
      { invocacion: "María, defensora de los que te invocan,", respuesta: "ruega por nosotros." },
      { invocacion: "María, alegría de los justos,", respuesta: "ruega por nosotros." },
      { invocacion: "María, consuelo de los afligidos,", respuesta: "ruega por nosotros." },
      { invocacion: "María, terror de los demonios,", respuesta: "ruega por nosotros." },
      { invocacion: "María, que aplastas la cabeza de la serpiente,", respuesta: "ruega por nosotros." },
      { invocacion: "María, tesoro de la Iglesia,", respuesta: "ruega por nosotros." },
      { invocacion: "María, puerta del cielo y vida eterna,", respuesta: "ruega por nosotros." },
      { invocacion: "María, maestra de los apóstoles,", respuesta: "ruega por nosotros." },
      { invocacion: "María, reina de todos los santos,", respuesta: "ruega por nosotros." },
      { invocacion: "María, flor de los patriarcas y profetas,", respuesta: "ruega por nosotros." },
    ],
  },
  {
    titulo: "Oración Final de Consagración",
    descripcion: "Acto de consagración a Jesús por manos de María según San Luis de Montfort",
    tipo: "simple",
    letanias: [
      {
        invocacion:
          "Yo, N., pecador infiel, renuevo y ratifico hoy en tus manos, oh María Inmaculada, los votos de mi bautismo. Renuncio para siempre a Satanás, a sus pompas y a sus obras, y me entrego enteramente a Jesucristo, la Sabiduría Encarnada, para llevar mi cruz en pos de Él todos los días de mi vida, y para serle más fiel de lo que he sido hasta ahora.",
        respuesta: "",
      },
      {
        invocacion:
          "En presencia de toda la corte celestial, te elijo hoy, oh María, por mi Madre y Señora. Te entrego y consagro, en calidad de esclavo, mi cuerpo y mi alma, mis bienes interiores y exteriores, y el valor mismo de mis buenas obras pasadas, presentes y futuras; te dejo entera y plenamente el derecho de disponer de mí y de todo lo que me pertenece, sin excepción alguna, según tu beneplácito, para mayor gloria de Dios, en el tiempo y en la eternidad.",
        respuesta: "",
      },
      {
        invocacion:
          "Recíbeme, oh Virgen clemente, en el número de aquellos a quienes amas, a quienes enseñas, guías, alimentas y proteges como a tus hijos y tus esclavos. Para ser un fiel esclavo tuyo, sé mi abogada ante tu Hijo; por tu intercesión llévame a la santidad y a la gloria, que no busco para mí, sino únicamente para Dios, en ti y por ti. Amén.",
        respuesta: "",
      },
    ],
  },
];

function LeteniaItem({ invocacion, respuesta, tipo }: { invocacion: string; respuesta: string; tipo: "dialogada" | "simple" }) {
  if (tipo === "simple") {
    return (
      <p
        className="text-foreground/90 leading-relaxed text-[14px] sm:text-[15px] py-1"
        style={{ lineHeight: "1.85", letterSpacing: "0.015em" }}
      >
        {invocacion}
      </p>
    );
  }

  return (
    <div className="flex gap-1 items-baseline py-0.5 group">
      <span className="text-foreground/85 text-[14px] sm:text-[15px] leading-relaxed flex-1">
        {invocacion}
      </span>
      <span className="text-primary font-medium text-[14px] sm:text-[15px] leading-relaxed flex-shrink-0 italic">
        {respuesta}
      </span>
    </div>
  );
}

export function LetaniasSection() {
  const [openGroup, setOpenGroup] = useState<number | null>(null);

  const toggleGroup = (index: number) => {
    setOpenGroup(openGroup === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {/* Intro */}
      <div className="mb-6 p-4 bg-card border border-border/30 rounded-lg">
        <p className="text-muted-foreground text-sm leading-relaxed">
          Las letanías son oraciones litúrgicas de súplica comunitaria. Las que aquí se presentan
          forman parte de la preparación y consagración a Jesús por María según el{" "}
          <em>Tratado de la Verdadera Devoción a la Santísima Virgen</em> de{" "}
          <strong className="text-foreground/80">San Luis María de Montfort</strong>.
        </p>
      </div>

      {gruposLetanias.map((grupo, index) => {
        const isOpen = openGroup === index;
        return (
          <div
            key={index}
            className="border border-border/30 rounded-lg bg-card overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => toggleGroup(index)}
              className={cn(
                "w-full flex items-center justify-between px-5 py-4 text-left transition-colors",
                "hover:bg-accent/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isOpen && "border-b border-border/30"
              )}
            >
              <div className="flex flex-col gap-0.5 items-start">
                <span className="text-base font-semibold text-foreground leading-snug">
                  {grupo.titulo}
                </span>
                {grupo.descripcion && (
                  <span className="text-xs text-muted-foreground">{grupo.descripcion}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-muted-foreground transition-transform duration-300 ml-3 flex-shrink-0",
                  isOpen && "rotate-180"
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>

            {/* Content */}
            {isOpen && (
              <div className="px-5 pb-5 pt-3">
                {/* Nota de uso */}
                {grupo.tipo === "dialogada" && (
                  <div className="mb-3 flex items-center gap-2 text-[11px] text-muted-foreground/70 uppercase tracking-wider">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary/50 flex-shrink-0" />
                    <span>Invocación — <em className="normal-case not-italic text-primary/70 font-medium">respuesta en cursiva</em></span>
                  </div>
                )}

                <div className={cn("divide-y divide-border/20", grupo.tipo === "simple" && "space-y-3 divide-y-0")}>
                  {grupo.letanias.map((letania, i) => (
                    <div key={i} className={grupo.tipo === "dialogada" ? "py-0.5" : ""}>
                      <LeteniaItem
                        invocacion={letania.invocacion}
                        respuesta={letania.respuesta}
                        tipo={grupo.tipo}
                      />
                    </div>
                  ))}
                </div>

                {/* Cierre para letanías dialogadas */}
                {grupo.tipo === "dialogada" && grupo.letanias.length > 5 && (
                  <div className="mt-4 pt-3 border-t border-border/30 text-center">
                    <p className="text-muted-foreground/60 text-[12px] italic">
                      Cordero de Dios, que quitas el pecado del mundo, perdónanos Señor. ✶
                      Cordero de Dios, que quitas el pecado del mundo, escúchanos Señor. ✶
                      Cordero de Dios, que quitas el pecado del mundo, ten misericordia de nosotros.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Footer espiritual */}
      <div className="pt-4 text-center">
        <p className="text-muted-foreground/60 text-xs italic">
          «A Jesús por María» — San Luis María Grignion de Montfort
        </p>
      </div>
    </div>
  );
}
