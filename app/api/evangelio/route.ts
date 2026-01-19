import { NextResponse } from "next/server";

interface EvangelioData {
  fecha: string;
  cita: string;
  titulo: string;
  texto: string;
  liturgia?: string;
}

export async function GET() {
  try {
    // Try to fetch from the Evangelio del Día API (evangeliodeldia.org)
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    
    // Use a reliable Catholic liturgy API
    const response = await fetch(
      `https://publication.evangelizo.ws/SP/days/${year}-${month}-${day}`,
      {
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error("API no disponible");
    }

    const data = await response.json();
    
    // Extract the Gospel reading from the response
    const gospelReading = data.readings?.find(
      (reading: { type?: string; reading_code?: string }) => 
        reading.type === "gospel" || reading.reading_code?.startsWith("GS")
    );

    if (!gospelReading) {
      throw new Error("Evangelio no encontrado");
    }

    const evangelio: EvangelioData = {
      fecha: data.liturgic_title || formatDate(today),
      cita: gospelReading.reference || "",
      titulo: gospelReading.title || "Evangelio del día",
      texto: gospelReading.text || "",
      liturgia: data.liturgic_title,
    };

    return NextResponse.json(evangelio);
  } catch (error) {
    console.error("Error fetching evangelio:", error);
    
    // Return a fallback message
    return NextResponse.json(
      {
        fecha: formatDate(new Date()),
        cita: "",
        titulo: "Evangelio del día",
        texto: "",
        error: true,
        mensaje: "El Evangelio del día no está disponible en este momento. Te invitamos a continuar con tu oración.",
      },
      { status: 200 } // Return 200 to not break the UI
    );
  }
}

function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formatted = date.toLocaleDateString("es-ES", options);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
