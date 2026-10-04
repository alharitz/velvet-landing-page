// DUMMY DATA - replace before launch
export interface Product {
  id: number;
  name: string;
  category: "outerwear" | "knitwear" | "trousers" | "essentials";
  price: number; // in IDR
  fabricLine: string;
  colors: string[]; // hex values
  tag?: "New" | "Bestseller";
  imageKey: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Essential Crew Neck",
    category: "essentials",
    price: 590000,
    fabricLine: "Organic Cotton",
    colors: ["#14110F", "#ECE5DA", "#9A6B4F"],
    tag: "New",
    imageKey: "collection-01",
  },
  {
    id: 2,
    name: "Relaxed Linen Shirt",
    category: "essentials",
    price: 790000,
    fabricLine: "European Linen",
    colors: ["#14110F", "#ECE5DA"],
    imageKey: "collection-02",
  },
  {
    id: 3,
    name: "Tailored Wool Trousers",
    category: "trousers",
    price: 1590000,
    fabricLine: "Merino Wool",
    colors: ["#14110F", "#6B645C"],
    tag: "Bestseller",
    imageKey: "collection-03",
  },
  {
    id: 4,
    name: "Minimal Wool Coat",
    category: "outerwear",
    price: 3790000,
    fabricLine: "Cashmere Blend",
    colors: ["#14110F", "#ECE5DA", "#6B645C"],
    imageKey: "collection-04",
  },
  {
    id: 5,
    name: "Cashmere Blend Sweater",
    category: "knitwear",
    price: 1690000,
    fabricLine: "Cashmere Blend",
    colors: ["#ECE5DA", "#9A6B4F", "#6B645C"],
    tag: "New",
    imageKey: "collection-05",
  },
  {
    id: 6,
    name: "Structured Blazer",
    category: "outerwear",
    price: 2490000,
    fabricLine: "Wool Blend",
    colors: ["#14110F", "#6B645C"],
    imageKey: "collection-06",
  },
  {
    id: 7,
    name: "Organic Cotton Basics Set",
    category: "essentials",
    price: 490000,
    fabricLine: "Organic Cotton",
    colors: ["#14110F", "#ECE5DA", "#FFFFFF"],
    imageKey: "collection-07",
  },
  {
    id: 8,
    name: "Selvedge Denim",
    category: "trousers",
    price: 1190000,
    fabricLine: "Japanese Selvedge",
    colors: ["#1a1f2e", "#4a5568"],
    tag: "Bestseller",
    imageKey: "collection-08",
  },
];

export function formatIDR(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getProductsByCategory(
  category?: string
): Product[] {
  if (!category || category === "all") return products;
  return products.filter((p) => p.category === category);
}
