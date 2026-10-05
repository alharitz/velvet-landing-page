// DUMMY DATA - replace before launch
export type ProductStatus = "available" | "preorder" | "sold-out";

export interface MarketplaceLink {
  shopee?: string;
  tokopedia?: string;
  lazada?: string;
  tiktok?: string;
  blibli?: string;
}

export interface Product {
  slug: string;
  name: string;
  category: "Outerwear" | "Knitwear" | "Trousers" | "Essentials";
  material: string;
  price: number; // in IDR, integer
  status: ProductStatus;
  description: string;
  images: string[]; // paths under public/images
  marketplaceLinks?: MarketplaceLink;
}

export const products: Product[] = [
  {
    slug: "essential-crew-neck",
    name: "Essential Crew Neck",
    category: "Essentials",
    material: "Organic Cotton",
    price: 590000,
    status: "available",
    description: "Everyday crew neck t-shirt made from certified organic cotton. Relaxed fit with ribbed neckline.",
    images: ["/images/collection-01.jpg"],
    marketplaceLinks: {
      shopee: "https://shopee.co.id/velvet.official",
      tokopedia: "https://www.tokopedia.com/velvet-official",
    },
  },
  {
    slug: "relaxed-linen-shirt",
    name: "Relaxed Linen Shirt",
    category: "Essentials",
    material: "European Linen",
    price: 790000,
    status: "available",
    description: "Lightweight linen shirt with a relaxed silhouette. Breathable fabric ideal for warm weather.",
    images: ["/images/collection-02.jpg"],
    marketplaceLinks: {
      shopee: "https://shopee.co.id/velvet.official",
      tokopedia: "https://www.tokopedia.com/velvet-official",
      lazada: "https://www.lazada.co.id/shop/velvet-official",
    },
  },
  {
    slug: "tailored-wool-trousers",
    name: "Tailored Wool Trousers",
    category: "Trousers",
    material: "Merino Wool",
    price: 1590000,
    status: "available",
    description: "Tailored wool trousers with a clean finish. Mid-rise, straight-leg cut in merino wool.",
    images: ["/images/collection-03.jpg"],
    marketplaceLinks: {
      shopee: "https://shopee.co.id/velvet.official",
      tokopedia: "https://www.tokopedia.com/velvet-official",
    },
  },
  {
    slug: "minimal-wool-coat",
    name: "Minimal Wool Coat",
    category: "Outerwear",
    material: "Cashmere Blend",
    price: 3790000,
    status: "available",
    description: "Minimalist wool coat in a cashmere blend. Clean lines, notch lapel, single-breasted closure.",
    images: ["/images/collection-04.jpg"],
    marketplaceLinks: {
      shopee: "https://shopee.co.id/velvet.official",
      tokopedia: "https://www.tokopedia.com/velvet-official",
    },
  },
  {
    slug: "cashmere-blend-sweater",
    name: "Cashmere Blend Sweater",
    category: "Knitwear",
    material: "Cashmere Blend",
    price: 1690000,
    status: "available",
    description: "Soft cashmere-blend sweater with a regular fit. Ribbed cuffs and hem.",
    images: ["/images/collection-05.jpg"],
    marketplaceLinks: {
      shopee: "https://shopee.co.id/velvet.official",
      tokopedia: "https://www.tokopedia.com/velvet-official",
    },
  },
  {
    slug: "structured-blazer",
    name: "Structured Blazer",
    category: "Outerwear",
    material: "Wool Blend",
    price: 2490000,
    status: "available",
    description: "Structured blazer in a wool blend. Notched lapel, two-button closure, functional cuff buttons.",
    images: ["/images/collection-06.jpg"],
    marketplaceLinks: {
      shopee: "https://shopee.co.id/velvet.official",
      tokopedia: "https://www.tokopedia.com/velvet-official",
    },
  },
  {
    slug: "organic-cotton-basics-set",
    name: "Organic Cotton Basics Set",
    category: "Essentials",
    material: "Organic Cotton",
    price: 490000,
    status: "available",
    description: "Set of two organic cotton basics. Crew neck and v-neck options in neutral tones.",
    images: ["/images/collection-07.jpg"],
    marketplaceLinks: {
      shopee: "https://shopee.co.id/velvet.official",
      tokopedia: "https://www.tokopedia.com/velvet-official",
    },
  },
  {
    slug: "selvedge-denim",
    name: "Selvedge Denim",
    category: "Trousers",
    material: "Japanese Selvedge",
    price: 1190000,
    status: "available",
    description: "Japanese selvedge denim with a straight fit. Raw denim that develops character over time.",
    images: ["/images/collection-08.jpg"],
    marketplaceLinks: {
      shopee: "https://shopee.co.id/velvet.official",
      tokopedia: "https://www.tokopedia.com/velvet-official",
      lazada: "https://www.lazada.co.id/shop/velvet-official",
    },
  },
];

/**
 * Returns all products.
 */
export function getAllProducts(): Product[] {
  return products;
}

/**
 * Returns a product by its slug, or undefined if not found.
 */
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/**
 * Returns all unique categories with their product counts.
 * Categories with zero products are excluded.
 */
export function getCategoriesWithCounts(): Array<{ name: string; count: number }> {
  const categoryMap = new Map<string, number>();

  for (const product of products) {
    const current = categoryMap.get(product.category) ?? 0;
    categoryMap.set(product.category, current + 1);
  }

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Formats an IDR value as "Rp 590.000".
 */
export function formatIDR(value: number): string {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

/**
 * Returns all unique materials from products.
 */
export function getUniqueMaterials(products: Product[]): string[] {
  const materials = new Set(products.map((p) => p.material));
  return Array.from(materials).sort();
}

/**
 * Returns all unique statuses from products.
 */
export function getUniqueStatuses(products: Product[]): ProductStatus[] {
  const statuses = new Set(products.map((p) => p.status));
  return Array.from(statuses).sort();
}

/**
 * Returns products filtered by category (case-insensitive).
 */
export function getProductsByCategory(category?: string): Product[] {
  if (!category || category.toLowerCase() === "all") return products;
  return products.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}