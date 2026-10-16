// DUMMY DATA - replace before launch
const storeHoursStructured = {
  weekdays: { open: "10:00", close: "20:00", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
  weekend: { open: "11:00", close: "18:00", days: ["Sun"] }
};

function generateStoreHoursString() {
  const weekdays = storeHoursStructured.weekdays;
  const weekend = storeHoursStructured.weekend;
  const weekdayDays = `${weekdays.days[0]}-${weekdays.days[weekdays.days.length - 1]}`; // Mon-Sat
  const weekendDay = weekend.days[0]; // Sun
  return `${weekdayDays} ${weekdays.open}-${weekdays.close} WIB, ${weekendDay} ${weekend.open}-${weekend.close} WIB`;
}

export const siteConfig = {
  name: "VELVET",
  tagline: "Made to Be Kept",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://velvet-landing-page-seven.vercel.app",
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "6281200000000", // digits only, international format — PLACEHOLDER
    display: "+62 812-0000-0000",
    hours: "Mon-Sat, 09:00-18:00 WIB",
    defaultMessage:
      "Halo VELVET, saya tertarik dengan koleksi Anda. Apakah masih tersedia?",
  },
  email: "hello@velvet.example",
  address: {
    line1: "Jl. Kemang Raya No. 88",
    line2: "Kemang, Jakarta Selatan 12730",
    country: "Indonesia",
  },
  storeHours: generateStoreHoursString(),
  map: {
    query: "Jl. Kemang Raya No. 88, Kemang, Jakarta Selatan 12730, Indonesia",
  },
  marketplaces: [
    {
      key: "shopee",
      name: "Shopee",
      url: "https://shopee.co.id/velvet.official",
    },
    {
      key: "tokopedia",
      name: "Tokopedia",
      url: "https://www.tokopedia.com/velvet-official",
    },
    {
      key: "lazada",
      name: "Lazada",
      url: "https://www.lazada.co.id/shop/velvet-official",
    },
    {
      key: "tiktok",
      name: "TikTok Shop",
      url: "https://www.tiktok.com/@velvet.official",
    },
    {
      key: "blibli",
      name: "Blibli",
      url: "https://www.blibli.com/merchant/velvet-official",
    },
  ],
  socials: {
    instagram: "https://instagram.com/velvet.official",
    tiktok: "https://www.tiktok.com/@velvet.official",
  },
  hero: {
    eyebrow: "SS26 Collection",
    title: "Made to Be Kept",
    subtext: "Merino, linen and cashmere essentials, cut with care and built to last.",
  },
};

// Structured store hours for validation and display
export { storeHoursStructured };

export function waLink(message?: string): string {
  const msg = message ?? siteConfig.whatsapp.defaultMessage;
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(
    msg
  )}`;
}

export function mapEmbedUrl(): string {
  return `https://www.google.com/maps?q=${encodeURIComponent(
    siteConfig.map.query
  )}&output=embed`;
}

export function mapLink(): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.map.query
  )}`;
}