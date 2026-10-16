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
  images: { src: string; alt: string }[];
  shortDescription: string;
  longDescription: string;
  details: Array<{ label: string; value: string }>;
  sizes: string[];
  care: string;
  marketplaceLinks?: MarketplaceLink;
}

export const products: Product[] = [
  {
    slug: "essential-crew-neck",
    name: "Editorial Look 01",
    category: "Essentials",
    material: "Visual reference",
    price: 590000,
    status: "available",
    description: "Portfolio sample garment image; final product specifications require owner confirmation.",
    images: [{ src: "/images/collection-01.jpg", alt: "Fashion editorial image" }],
    shortDescription: "A considered everyday piece from the Velvet collection.",
    longDescription: "Fictional portfolio content with a sample image, price, and sizes. This visual reference does not establish garment specifications or real availability.",
    details: [{ label: "Category", value: "Essentials" }, { label: "Image", value: "Visual reference only" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    care: "Follow the garment care label and ask Velvet to confirm care instructions for the final piece.",
    marketplaceLinks: {
      shopee: "https://shopee.co.id/velvet.official",
      tokopedia: "https://www.tokopedia.com/velvet-official",
    },
  },
  {
    slug: "relaxed-linen-shirt",
    name: "Editorial Look 02",
    category: "Essentials",
    material: "Visual reference",
    price: 790000,
    status: "available",
    description: "Portfolio sample garment image; final product specifications require owner confirmation.",
    images: [{ src: "/images/collection-02.jpg", alt: "Fashion editorial image" }],
    shortDescription: "A considered everyday piece from the Velvet collection.",
    longDescription: "Fictional portfolio content with a sample image, price, and sizes. This visual reference does not establish garment specifications or real availability.",
    details: [{ label: "Category", value: "Essentials" }, { label: "Image", value: "Visual reference only" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    care: "Follow the garment care label and ask Velvet to confirm care instructions for the final piece.",
    marketplaceLinks: {
      shopee: "https://shopee.co.id/velvet.official",
      tokopedia: "https://www.tokopedia.com/velvet-official",
      lazada: "https://www.lazada.co.id/shop/velvet-official",
    },
  },
  {
    slug: "tailored-wool-trousers",
    name: "Editorial Look 03",
    category: "Trousers",
    material: "Visual reference",
    price: 1590000,
    status: "available",
    description: "Portfolio sample garment image; final product specifications require owner confirmation.",
    images: [{ src: "/images/collection-03.jpg", alt: "Fashion editorial image" }],
    shortDescription: "A considered everyday piece from the Velvet collection.",
    longDescription: "Fictional portfolio content with a sample image, price, and sizes. This visual reference does not establish garment specifications or real availability.",
    details: [{ label: "Category", value: "Trousers" }, { label: "Image", value: "Visual reference only" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    care: "Follow the garment care label and ask Velvet to confirm care instructions for the final piece.",
    marketplaceLinks: {
      shopee: "https://shopee.co.id/velvet.official",
      tokopedia: "https://www.tokopedia.com/velvet-official",
    },
  },
  {
    slug: "minimal-wool-coat",
    name: "Editorial Look 04",
    category: "Outerwear",
    material: "Visual reference",
    price: 3790000,
    status: "available",
    description: "Portfolio sample garment image; final product specifications require owner confirmation.",
    images: [{ src: "/images/collection-04.jpg", alt: "Fashion editorial image" }],
    shortDescription: "A considered everyday piece from the Velvet collection.",
    longDescription: "Fictional portfolio content with a sample image, price, and sizes. This visual reference does not establish garment specifications or real availability.",
    details: [{ label: "Category", value: "Outerwear" }, { label: "Image", value: "Visual reference only" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    care: "Follow the garment care label and ask Velvet to confirm care instructions for the final piece.",
    marketplaceLinks: {
      shopee: "https://shopee.co.id/velvet.official",
      tokopedia: "https://www.tokopedia.com/velvet-official",
    },
  },
  {
    slug: "cashmere-blend-sweater",
    name: "Editorial Look 05",
    category: "Knitwear",
    material: "Visual reference",
    price: 1690000,
    status: "available",
    description: "Portfolio sample garment image; final product specifications require owner confirmation.",
    images: [{ src: "/images/collection-05.jpg", alt: "Fashion editorial image" }],
    shortDescription: "A considered everyday piece from the Velvet collection.",
    longDescription: "Fictional portfolio content with a sample image, price, and sizes. This visual reference does not establish garment specifications or real availability.",
    details: [{ label: "Category", value: "Knitwear" }, { label: "Image", value: "Visual reference only" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    care: "Follow the garment care label and ask Velvet to confirm care instructions for the final piece.",
    marketplaceLinks: {
      shopee: "https://shopee.co.id/velvet.official",
      tokopedia: "https://www.tokopedia.com/velvet-official",
    },
  },
  {
    slug: "structured-blazer",
    name: "Editorial Look 06",
    category: "Outerwear",
    material: "Visual reference",
    price: 2490000,
    status: "available",
    description: "Portfolio sample garment image; final product specifications require owner confirmation.",
    images: [{ src: "/images/collection-06.jpg", alt: "Fashion editorial image" }],
    shortDescription: "A considered everyday piece from the Velvet collection.",
    longDescription: "Fictional portfolio content with a sample image, price, and sizes. This visual reference does not establish garment specifications or real availability.",
    details: [{ label: "Category", value: "Outerwear" }, { label: "Image", value: "Visual reference only" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    care: "Follow the garment care label and ask Velvet to confirm care instructions for the final piece.",
    marketplaceLinks: {
      shopee: "https://shopee.co.id/velvet.official",
      tokopedia: "https://www.tokopedia.com/velvet-official",
    },
  },
  {
    slug: "organic-cotton-basics-set",
    name: "Editorial Look 07",
    category: "Essentials",
    material: "Visual reference",
    price: 490000,
    status: "available",
    description: "Portfolio sample garment image; final product specifications require owner confirmation.",
    images: [{ src: "/images/collection-07.jpg", alt: "Fashion editorial image" }],
    shortDescription: "A considered everyday piece from the Velvet collection.",
    longDescription: "Fictional portfolio content with a sample image, price, and sizes. This visual reference does not establish garment specifications or real availability.",
    details: [{ label: "Category", value: "Essentials" }, { label: "Image", value: "Visual reference only" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    care: "Follow the garment care label and ask Velvet to confirm care instructions for the final piece.",
    marketplaceLinks: {
      shopee: "https://shopee.co.id/velvet.official",
      tokopedia: "https://www.tokopedia.com/velvet-official",
    },
  },
  {
    slug: "selvedge-denim",
    name: "Editorial Look 08",
    category: "Trousers",
    material: "Visual reference",
    price: 1190000,
    status: "available",
    description: "Portfolio sample garment image; final product specifications require owner confirmation.",
    images: [{ src: "/images/collection-08.jpg", alt: "Fashion editorial image" }],
    shortDescription: "A considered everyday piece from the Velvet collection.",
    longDescription: "Fictional portfolio content with a sample image, price, and sizes. This visual reference does not establish garment specifications or real availability.",
    details: [{ label: "Category", value: "Trousers" }, { label: "Image", value: "Visual reference only" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    care: "Follow the garment care label and ask Velvet to confirm care instructions for the final piece.",
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

export function getRelatedProducts(slug: string, limit: number): Product[] {
  const current = getProductBySlug(slug);
  return products.filter((product) => product.slug !== slug).sort((a, b) => Number(b.category === current?.category) - Number(a.category === current?.category)).slice(0, limit);
}

export function getAdjacentProducts(slug: string): [Product, Product] {
  const index = products.findIndex((product) => product.slug === slug);
  const position = index < 0 ? 0 : index;
  return [products[(position - 1 + products.length) % products.length], products[(position + 1) % products.length]];
}
