// DUMMY DATA - replace before launch
export const siteConfig = {
  name: "VELVET",
  whatsapp: {
    number: "6281200000000", // digits only, international format
    display: "+62 812-0000-0000",
    hours: "Mon-Sat, 09:00-18:00 WIB",
    defaultMessage:
      "Hi VELVET, I'd like to know more about your collection.",
  },
  email: "hello@velvet.example",
  address: {
    line1: "Jl. Kemang Raya No. 88",
    line2: "Kemang, Jakarta Selatan 12730",
    country: "Indonesia",
  },
  storeHours: "Mon-Sat 10:00-20:00 WIB, Sun 11:00-18:00 WIB",
  map: {
    query: "Indomaret Kemang Raya, Jakarta Selatan",
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
};

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
