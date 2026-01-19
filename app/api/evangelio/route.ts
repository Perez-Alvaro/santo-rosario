import { NextResponse } from "next/server";

interface Reading {
  type: string;
  reference: string;
  title: string;
  text: string;
}

interface EvangelioData {
  fecha: string;
  liturgia?: string;
  primeraLectura?: Reading;
  salmo?: Reading;
  segundaLectura?: Reading;
  evangelio?: Reading;
  error?: boolean;
  mensaje?: string;
}

export async function GET() {
  try {
    // Fetch from Evangelizo.org API
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    // Use Evangelizo.org API with correct endpoint
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

    // The API returns data.data with the actual content
    const dayData = data.data || data;

    // Initialize readings
    let primeraLectura: Reading | undefined;
    let salmo: Reading | undefined;
    let segundaLectura: Reading | undefined;
    let evangelio: Reading | undefined;

    // Extract all readings from the API
    if (dayData.readings && Array.isArray(dayData.readings)) {
      dayData.readings.forEach((reading: any) => {
        const readingData: Reading = {
          type: reading.type || "",
          reference: reading.reference || "",
          title: reading.title || "",
          text: reading.text || "",
        };

        // Categorize readings by type
        // The API uses type "reading" with reading_number (1 or 2) for Primera and Segunda Lectura
        if (reading.type === "reading" && reading.reading_number === 1) {
          primeraLectura = readingData;
        } else if (reading.type === "reading" && reading.reading_number === 2) {
          segundaLectura = readingData;
        } else if (reading.type === "first_reading" || reading.reading_code?.startsWith("FR")) {
          primeraLectura = readingData;
        } else if (reading.type === "psalm" || reading.reading_code?.startsWith("PS")) {
          salmo = readingData;
        } else if (reading.type === "second_reading" || reading.reading_code?.startsWith("SR")) {
          segundaLectura = readingData;
        } else if (reading.type === "gospel" || reading.reading_code?.startsWith("GS") || reading.title?.toLowerCase().includes("evangelio")) {
          evangelio = readingData;
        }
      });
    }

    // If no readings found, try alternative structure
    if (!evangelio && dayData.gospel) {
      evangelio = {
        type: "gospel",
        reference: dayData.gospel.reference || "",
        title: dayData.gospel.title || "Evangelio del día",
        text: dayData.gospel.text || "",
      };
    }

    if (!primeraLectura && dayData.first_reading) {
      primeraLectura = {
        type: "first_reading",
        reference: dayData.first_reading.reference || "",
        title: dayData.first_reading.title || "Primera Lectura",
        text: dayData.first_reading.text || "",
      };
    }

    if (!salmo && dayData.psalm) {
      salmo = {
        type: "psalm",
        reference: dayData.psalm.reference || "",
        title: dayData.psalm.title || "Salmo Responsorial",
        text: dayData.psalm.text || "",
      };
    }

    const liturgiaData: EvangelioData = {
      fecha: dayData.liturgic_title || formatDate(today),
      liturgia: dayData.liturgic_title,
      primeraLectura,
      salmo,
      segundaLectura,
      evangelio,
    };

    return NextResponse.json(liturgiaData);
  } catch (error) {
    console.error("Error fetching liturgia:", error);

    // Return a fallback message
    return NextResponse.json(
      {
        fecha: formatDate(new Date()),
        error: true,
        mensaje: "La liturgia del día no está disponible en este momento. Te invitamos a continuar con tu oración.",
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
